import { useI18n } from 'vue-i18n';
import { Event } from '@/types/LiveEvents';
import { formatShowDuration, ONE_HR_IN_MS, ONE_MIN_IN_MS } from '@/utils/time.utils';
import { TagVariant } from '@/components/TagItem.vue';

export function useEventUtils() {
  const { t, d, locale } = useI18n();

  const getEventTimeLabel = (event: Event['event'], now: number = new Date().getTime()): string => {
    const startedAgo = now - event.liveStartTime;
    if (event.currentStatus === 'live') {
      return `${t('event.live')} - ${formatShowDuration(startedAgo)}`;
    } else if (event.currentStatus === 'vod') {
      const rtf = new Intl.RelativeTimeFormat(locale.value, { style: 'narrow' });

      const nowIntl = new Intl.DateTimeFormat('en-US').format(now);
      const startDate = new Intl.DateTimeFormat('en-US').format(event.liveStartTime);

      let eventDateTime = '';
      if (startedAgo < ONE_HR_IN_MS) {
        eventDateTime = rtf.format(Math.floor(-startedAgo / ONE_MIN_IN_MS), 'minute');
      } else if (startedAgo < 6 * ONE_HR_IN_MS) {
        eventDateTime = rtf.format(Math.floor(-startedAgo / ONE_HR_IN_MS), 'hour');
      } else if (nowIntl === startDate) {
        eventDateTime = t('event.today');
      } else {
        eventDateTime = d(new Date(event.liveEndTime), 'weekdayWithTime');
      }

      return `${eventDateTime} - ${t('event.recording')}`;
    } else if (event.currentStatus === 'planned') {
      const willStartIn = event.eventStartTimestamp - now;

      const nowIntl = new Intl.DateTimeFormat('en-US').format(now);
      const startDate = new Intl.DateTimeFormat('en-US').format(event.eventStartTimestamp);

      // checking the case if the event is late
      if (willStartIn > 0 || nowIntl === startDate) {
        const tommorowIntl = new Intl.DateTimeFormat('en-US').format(new Date().getTime() + ONE_HR_IN_MS * 24);

        if (nowIntl === startDate) {
          return `${t('event.today')} ${d(new Date(event.eventStartTimestamp), 'time')}`;
        } else if (tommorowIntl === startDate) {
          return `${t('event.tomorrow')} ${d(new Date(event.eventStartTimestamp), 'time')}`;
        }
      }
      return d(new Date(event.eventStartTimestamp), 'dateWithTime');
    }
    return '';
  };

  const getEventColor = (event: Event['event']): TagVariant | undefined => {
    if (event.currentStatus === 'live') {
      return 'red';
    } else if (event.currentStatus === 'vod') {
      return 'violet';
    } else if (event.currentStatus === 'planned') {
      return 'blue';
    }

    return undefined;
  };

  return {
    getEventTimeLabel,
    getEventColor,
  };
}
