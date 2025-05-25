import { RepeatFrequency, RepeatOn } from './config';
import { CronGeneratorDto } from './dto/workflow.dto';
import { datetime, Frequency, RRule, Options as RRuleOptions } from 'rrule';
import moment from 'moment-timezone';
const DayMapper = {
  [RepeatOn.Monday]: RRule.MO,
  [RepeatOn.Tuesday]: RRule.TU,
  [RepeatOn.Wednesday]: RRule.WE,
  [RepeatOn.Thursday]: RRule.TH,
  [RepeatOn.Friday]: RRule.FR,
  [RepeatOn.Saturday]: RRule.SA,
  [RepeatOn.Sunday]: RRule.SU,
};

export const cronExpressionGenerator = (payload: CronGeneratorDto) => {
  const recurrenceRuleOptions: Partial<RRuleOptions> = {};

  recurrenceRuleOptions.freq = Frequency[payload.repeatFrequency];

  if (payload.repeatInterval) recurrenceRuleOptions.interval = payload.repeatInterval;

  if (payload.repeatCount) recurrenceRuleOptions.count = payload.repeatCount;

  if (payload.repeatOn) {
    recurrenceRuleOptions.byweekday = payload.repeatOn.map((day) => {
      return DayMapper[day];
    });
  }

  if (payload.repeatStartDate) {
    const startTime = moment(payload.repeatStartDate).utc();
    const hour = startTime.hour();
    const minute = startTime.minute();
    const second = startTime.second();
    const date = startTime.date();
    const month = startTime.month() + 1; // 0-11
    const year = startTime.year();

    recurrenceRuleOptions.dtstart = datetime(year, month, date, hour, minute, second);
  }

  if (payload.repeatEndDate) {
    const endTime = moment(payload.repeatEndDate);
    const hour = endTime.hour();
    const minute = endTime.minute();
    const second = endTime.second();
    const date = endTime.date();
    const month = endTime.month() + 1; // 0-11
    const year = endTime.year();

    recurrenceRuleOptions.until = datetime(year, month, date, hour, minute, second);
  }

  const rule = new RRule(recurrenceRuleOptions);

  return {
    text: rule.toText(),
    rrule: rule.toString(),
  };
};
