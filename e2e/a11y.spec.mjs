import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'];
const event = {
  date: '2030-03-12',
  month: 'March',
  day: '12',
  speaker: 'Example Speaker',
  title: 'Example talk',
  url: 'https://example.com/rsvp',
};
const viewports = {
  mobile: { width: 390, height: 844 },
  desktop: { width: 1280, height: 900 },
};

for (const [size, viewport] of Object.entries(viewports)) {
  for (const colorScheme of ['light', 'dark']) {
    test(`homepage meets axe WCAG A and AA rules on ${size} in ${colorScheme} mode`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.emulateMedia({ colorScheme });
      await page.clock.setFixedTime(new Date('2030-03-01T12:00:00Z'));
      await page.route('https://**', (route) => route.abort());
      const eventWithRsvpLinks = { ...event, lumaUrl: 'https://luma.com/example' };
      await page.route('**/assets/data/events.json', (route) => route.fulfill({
        json: { events: [eventWithRsvpLinks] },
      }));
      await page.goto('/');
      const meetupLink = page.getByRole('link', { name: 'RSVP on Meetup' });
      const lumaLink = page.getByRole('link', { name: 'RSVP on Luma' });
      await expect(meetupLink).toHaveAttribute('href', event.url);
      await expect(lumaLink).toHaveAttribute('href', eventWithRsvpLinks.lumaUrl);
      await expect(page.locator('.js-event-template').getByRole('link')).toHaveText([
        'RSVP on Luma', 'RSVP on Meetup', 'Browse events',
      ]);
      await expect(lumaLink).toHaveClass(/\bbtn--red\b/);
      await expect(meetupLink).toHaveClass(/\bbtn--ghost-red\b/);
      await expect(meetupLink.locator('.fa-meetup')).toHaveAttribute('aria-hidden', 'true');
      await expect(lumaLink.locator('.fa-luma-sparkle')).toHaveAttribute('aria-hidden', 'true');

      const { violations } = await new AxeBuilder({ page }).withTags(tags).analyze();
      expect(violations.map(({ id, help, nodes }) => ({
        id,
        help,
        nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })),
      }))).toEqual([]);
    });
  }
}
