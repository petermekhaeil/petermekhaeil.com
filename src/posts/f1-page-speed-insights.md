---
title: F1 Page Speed Insights
date: 2020-12-15
tags:
  - webdev
  - performance
---

F1 2020 is over - Mercedes took 1st and 2nd position, with Red Bull right behind them in 3rd. But which team won in terms of web speed performance? Let's take a look at their PageSpeed Insights and Lighthouse scores.

### How Scores are Measured

[PageSpeed Insights](https://developers.google.com/speed/docs/insights/v5/about){title="PageSpeed Insights"}{target=\_blank}{rel=noopener} is a tool that reports on site performance and it includes lab data from [Lighthouse](https://developers.google.com/web/tools/lighthouse/){title="Lighthouse"}{target=\_blank}{rel=noopener} and real-world field data from [Chrome User Experience Report (CrUX)](https://developers.google.com/web/tools/chrome-user-experience-report/){title="CrUX"}{target=\_blank}{rel=noopener}.

[Lab Data](https://developers.google.com/web/fundamentals/performance/speed-tools/#lab_data){title="Lab Data"}{target=\_blank}{rel=noopener} is measured under controlled conditions - simulating a single device with fixed network conditions. [Field Data](https://developers.google.com/web/fundamentals/performance/speed-tools/#field_data){title="Field Data"}{target=\_blank}{rel=noopener} is capturing real-world user experience - these are from real page views over a set period of time.

I have aggregated the results and built a site to show us a summary: [F1 Page Speed Insights](https://f1-page-speed-insights.netlify.app/){title="F1 Page Speed Insights"}{target=\_blank}{rel=noopener}.

We will start with the score everyone wants to see first:

### Performance Score

![Performance Scores](../assets/blog-images/f1-page-speed-insights/1.png 'Performance Scores')

At the time of this post, **Haas** takes the lead with a score of 64. This score is a weighted average of a collection of [performance metrics](https://web.dev/performance-scoring/){title="Performance Metrics"}{target=\_blank}{rel=noopener} measured in Lighthouse:

- [First Contentful Paint (FCP)](https://web.dev/first-contentful-paint/){title="First Contentful Paint"}{target=\_blank}{rel=noopener} - time at which first content appears.
- [Speed Index](https://web.dev/speed-index/){title="Speed Index"}{target=\_blank}{rel=noopener} - how quickly content visibly populates.
- [Largest Contentful Paint (LCP)](https://web.dev/lcp/){title="Largest Contentful Paint"}{target=\_blank}{rel=noopener} - time at which largest content appears.
- [Time to Interactive](https://web.dev/interactive/){title="Time to Interactive"}{target=\_blank}{rel=noopener} - time at which page becomes interactive.
- [Total Blocking Time](https://web.dev/lighthouse-total-blocking-time/){title="Total Blocking Time"}{target=\_blank}{rel=noopener} - time from FCP to Time to Interactive.
- [Cumulative Layout Shift (CLS)](https://web.dev/cls/){title="Cumulative Layout Shift"}{target=\_blank}{rel=noopener} - the movement of elements within the viewport.

Important to note here that these Lighthouse scores are based on **Lab Data**.

A score of 90 or above is considered good. So these teams have some work to do on their season breaks.

### Field Data Scores

![Field Data Scores](../assets/blog-images/f1-page-speed-insights/2.png 'Field Data Scores')

The list is ordered according to their Performance Scores. We can see **Racing Point** takes the lead for `Cumulative Layout Shift` and **Williams** for `Largest Contentful Paint`.

Field Data scores are gathered from the CrUX and you will notice 3 of them are metrics used in the Performance Scores. The 4th one being [First Input Delay (FID)](https://web.dev/fid/){title="First Input Delay"}{target=\_blank}{rel=noopener}. Each of these metrics have their own [scoring](https://developers.google.com/speed/docs/insights/v5/about#categories){title="Metric Scores"}{target=\_blank}{rel=noopener}.

### Team Breakdown

#### Racing Point

![Racing Point](../assets/blog-images/f1-page-speed-insights/4.png 'Racing Point')

The big number is the performance score we spoke about earlier. Right under it is the [Core Web Vitals](https://web.dev/vitals/){title="Core Web Vitals"}{target=\_blank}{rel=noopener} assessment summary.

Core Web Vitals are a common set of signals critical to all web experiences, measuring the quality of a site's user experience. A site either passes, or does not pass the assessment. 3 metrics are used to measure a website's Core Web Vital assessment: `Largest Contentful Paint (LCP)`, `Cumulative Layout Shift (CLS)` and `First Input Delay (FID)`.

To pass the assessment, 75% of page views need to hit the recommended target of each metric for it to be considered good performance. When the 3 metrics hit that target, the site passes the assessment. Take a read on how Google [defines the metrics thresholds](https://web.dev/defining-core-web-vitals-thresholds/){title="Defining Core Web Vital Thresholds"}{target=\_blank}{rel=noopener}.

In the example above, Racing Point passed. And it can be seen in more details on the right hand side. These are the Field Data scores we saw earlier, but broken down to indicate the percentage of viewers and their experience. For example, for CLS - 79% of viewers had a good experience and 9% had a poor experience.

Let's take a look at the Williams too. They scored very similar scores but with a noticable difference:

#### Williams

![Williams](../assets/blog-images/f1-page-speed-insights/5.png 'Williams')

The Lab Data didn't perform as well (which is totally fine! Lab Data has its purposes) and it passed the Core Vital assessment from the Field Data, collected from real-world users.

### Time strips

Perhaps it is not always about the score? Take a look at the time strip Lighthouse has generated for both sites:

#### Racing Point Timestrip

![Racing Point Timestrip'](../assets/blog-images/f1-page-speed-insights/6.png 'Racing Point Timestrip')

#### Williams Timestrip

![Williams Timestrip'](../assets/blog-images/f1-page-speed-insights/7.png 'Williams Timestrip')

We can see that content is loaded earlier for Williams.

### Read More

[Jake Archbald](https://jakearchibald.com/2019/f1-perf/) has written a detailed post on who has the fastest website in F1. Highly recommend to read his break down analysis.

### How does 'F1 Page Speed Insights' site work?

[F1 Page Speed Insights](https://f1-page-speed-insights.netlify.app/) was built using [Next.js](https://nextjs.org/) - Using the [PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started) and the [Chrome UX Report API](https://developers.google.com/web/tools/chrome-user-experience-report/api/guides/getting-started) to collect the data. Both sets of data are collected during the build of the app and a static export is deployed on [Netlify](http://netlify.app/). This site will refresh monthly for us to monitor changes to the data.
