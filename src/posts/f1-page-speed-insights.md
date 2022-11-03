---
title: Page Speed Performance of Formula 1 Websites
date: 2020-12-15
description: Performance report using PageSpeed Insights and Chrome User Experience Report to showcase which Formula 1 team has the fastest web performance.
tags:
  - performance
devto: https://dev.to/petermekhaeil/f1-page-speed-insights-3bji
eleventyNavigation:
  parent: Writing
---

F1 2020 is over - Mercedes took 1st and 2nd position, with Red Bull right behind them in 3rd. But which team won in terms of web speed performance?

### How Scores are Measured

[PageSpeed Insights](https://developers.google.com/speed/docs/insights/v5/about){title="PageSpeed Insights"} is a tool that reports on site performance and it includes both lab data and real-world field data.

[Lab Data](https://developers.google.com/web/fundamentals/performance/speed-tools/#lab_data){title="Lab Data"} is collected by running [Lighthouse](https://developers.google.com/web/tools/lighthouse){title="Lighthouse"} and is measured under controlled conditions - simulating a single device with fixed network conditions. [Field Data](https://developers.google.com/web/fundamentals/performance/speed-tools/#field_data){title="Field Data"} is collected from [Chrome User Experience Report (CrUX)](https://developers.google.com/web/tools/chrome-user-experience-report/){title="CrUX"} and it is capturing real-world user experience - these are from real page views over a set period of time.

I have aggregated the results and built a site to show us a summary: [F1 Page Speed Insights](https://f1-page-speed-insights.netlify.app/){title="F1 Page Speed Insights"}.

We will start with the score everyone wants to see first:

### Performance Score

![Performance Scores](/images/uploads/f1-page-speed-insights-1.png 'Performance Scores')

At the time of this post, **Haas** takes the lead with a score of 64. This score is a weighted average of a collection of [performance metrics](https://web.dev/performance-scoring/){title="Performance Metrics"} measured in Lighthouse:

- [First Contentful Paint (FCP)](https://web.dev/first-contentful-paint/){title="First Contentful Paint"} - time at which first content appears.
- [Speed Index](https://web.dev/speed-index/){title="Speed Index"} - how quickly content visibly populates.
- [Largest Contentful Paint (LCP)](https://web.dev/lcp/){title="Largest Contentful Paint"} - time at which largest content appears.
- [Time to Interactive](https://web.dev/interactive/){title="Time to Interactive"} - time at which page becomes interactive.
- [Total Blocking Time](https://web.dev/lighthouse-total-blocking-time/){title="Total Blocking Time"} - time from FCP to Time to Interactive.
- [Cumulative Layout Shift (CLS)](https://web.dev/cls/){title="Cumulative Layout Shift"} - the movement of elements within the viewport.

Important to note here that these Lighthouse scores are based on **Lab Data**.

A score of 90 or above is considered good. So these teams have some work to do on their season breaks.

### Field Data Scores

![Field Data Scores](/images/uploads/f1-page-speed-insights-2.png 'Field Data Scores')

The list is ordered according to their Performance Scores. We can see **Racing Point** takes the lead for `Cumulative Layout Shift` and **Williams** for `Largest Contentful Paint`.

You will notice 3 of the Field Data metrics are used in the Performance Scores. The 4th one being [First Input Delay (FID)](https://web.dev/fid/){title="First Input Delay"}. Each of these metrics have their own [scoring](https://developers.google.com/speed/docs/insights/v5/about#categories){title="Metric Scores"}.

### Team Breakdown

#### Racing Point

![Racing Point](/images/uploads/f1-page-speed-insights-4.png 'Racing Point')

The big number is the performance score we spoke about earlier. Right under it is the [Core Web Vitals](https://web.dev/vitals/){title="Core Web Vitals"} assessment summary.

Core Web Vitals are a common set of signals critical to all web experiences, measuring the quality of a site's user experience. A site either passes, or does not pass the assessment. 3 metrics are used to measure a website's Core Web Vital assessment: `Largest Contentful Paint (LCP)`, `Cumulative Layout Shift (CLS)` and `First Input Delay (FID)`.

To pass the assessment, 75% of page views need to hit the recommended target of each metric for it to be considered good performance. When the 3 metrics hit that target, the site passes the assessment. Take a read on how Google [defines the metrics thresholds](https://web.dev/defining-core-web-vitals-thresholds/){title="Defining Core Web Vital Thresholds"}.

In the example above, Racing Point passed. And it can be seen in more details on the right hand side. These are the Field Data scores we saw earlier, but broken down to indicate the percentage of viewers and their experience. For example, for CLS - 79% of viewers had a good experience and 9% had a poor experience.

Let's take a look at the Williams too. They scored very similar scores but with a noticeable difference:

#### Williams

![Williams](/images/uploads/f1-page-speed-insights-5.png 'Williams')

The Lab Data didn't perform as well (which is totally fine! Lab Data has its purposes) and it passed the Core Vital assessment from the Field Data, collected from real-world users.

### Time strips

Perhaps it is not always about the score? Take a look at the time strip Lighthouse has generated for both sites:

#### Racing Point Timestrip

![Racing Point Timestrip'](/images/uploads/f1-page-speed-insights-6.png 'Racing Point Timestrip')

#### Williams Timestrip

![Williams Timestrip'](/images/uploads/f1-page-speed-insights-7.png 'Williams Timestrip')

We can see that content is loaded earlier for Williams.

### Read More

[Jake Archbald](https://jakearchibald.com/2019/f1-perf/) has written a detailed post on who has the fastest website in F1. Highly recommend to read his break down analysis.

### How does 'F1 Page Speed Insights' site work?

[F1 Page Speed Insights](https://f1-page-speed-insights.netlify.app/) was built using [Next.js](https://nextjs.org/) - Using the [PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started) and the [Chrome UX Report API](https://developers.google.com/web/tools/chrome-user-experience-report/api/guides/getting-started) to collect the data. Both sets of data are collected during the build of the app and a static export is deployed on [Netlify](http://netlify.app/). This site will refresh monthly for us to monitor changes to the data.

### Update: 2020-12-19

Previously on [F1 Page Speed Insights](https://f1-page-speed-insights.netlify.app/){title="F1 Page Speed Insights"}, the performance score was based on [Lab Data](https://developers.google.com/web/fundamentals/performance/speed-tools/#lab_data){title="Lab Data"} captured from [Lighthouse](https://developers.google.com/web/tools/lighthouse){title="Lighthouse"}. Lab Data has it's benefits - the data is collected from a simulated load on a site using a single device and a fixed network connection. This allows for a reproducible environment which aids in debugging performance issues.

Lighthouse scoring can [fluctuate](https://github.com/GoogleChrome/lighthouse/blob/master/docs/variability.md){title="Lighthouse Variability"}. This is because of external conditions such as internet traffic routing, testing on difference devices or network conditions. And because of this, it might not be the right choice to the performance comparison I am looking for.

I have come across [lighthouse-plugin-field-performance](https://github.com/treosh/lighthouse-plugin-field-performance){title="lighthouse-plugin-field-performance"} which lets Lighthouse weigh the scoring using the [Field Data](https://developers.google.com/web/fundamentals/performance/speed-tools/#field_data){title="Field Data"} collected from the [Chrome UX Report](https://developers.google.com/web/tools/chrome-user-experience-report/){title="Chrome UX Report"}:

> The scoring algorithm weighs values for Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS) and picks a minimum score. It uses Core Web Vitals assessment that expects all its metrics to pass thresholds.

Updating the F1 Page Speed Insights scoring to follow this approach results in new positions in the scoring:

![Performance Scores](/images/uploads/f1-page-speed-insights-8.png 'Performance Scores')

The scoring is based on the [Core Web Vitals](https://web.dev/vitals/){title="Core Web Vitals"} metrics and Lighthouse will score those metrics accordingly. The metric with the lowest score is the final performance score.

All of [F1 Page Speed Insights](https://f1-page-speed-insights.netlify.app/){title="PageSpeed Insights"} data comes from the Chrome UX Report which is collected from real-world users over the last 28 days.

Credits to [Treo](https://treo.sh/){title="Treo.sh"} for this approach!
