---
title: Updating the scoring to F1 Page Speed Insights
date: 2020-12-19
tags:
  - webdev
  - performance
---

Previously on [F1 Page Speed Insights](https://f1-page-speed-insights.netlify.app/){title="F1 Page Speed Insights"}{target=\_blank}{rel=noopener}, the performance score was based on [Lab Data](https://developers.google.com/web/fundamentals/performance/speed-tools/#lab_data){title="Lab Data"}{target=\_blank}{rel=noopener} captured from [Lighthouse](https://developers.google.com/web/tools/lighthouse){title="Lighthouse"}{target=\_blank}{rel=noopener}. Lab Data has it's benefits - the data is collected from a simulated load on a site using a single device and a fixed network connection. This allows for a reproducible environment which aids in debugging performance issues.

Lighthouse scoring can [fluctuate](https://github.com/GoogleChrome/lighthouse/blob/master/docs/variability.md){title="Lighthouse Variability"}{target=\_blank}{rel=noopener}. This is because of external conditions such as internet traffic routing, testing on difference devices or network conditions. And because of this, it might not be the right choice to the performance comparison I am looking for.

I have come across [lighthouse-plugin-field-performance](https://github.com/treosh/lighthouse-plugin-field-performance){title="lighthouse-plugin-field-performance"}{target=\_blank}{rel=noopener} which lets Lighthouse weigh the scoring using the [Field Data](https://developers.google.com/web/fundamentals/performance/speed-tools/#field_data){title="Field Data"}{target=\_blank}{rel=noopener} collected from the [Chrome UX Report](https://developers.google.com/web/tools/chrome-user-experience-report/){title="Chrome UX Report"}{target=\_blank}{rel=noopener}:

> The scoring algorithm weighs values for Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS) and picks a minimum score. It uses Core Web Vitals assessment that expects all its metrics to pass thresholds.

Updating the F1 Page Speed Insights scoring to follow this approach results in new positions in the scoring:

![Performance Scores](../assets/blog-images/f1-page-speed-insights/8.png 'Performance Scores')

The scoring is based on the [Core Web Vitals](https://web.dev/vitals/){title="Core Web Vitals"}{target=\_blank}{rel=noopener} metrics and Lighthouse will score those metrics accordingly. The metric with the lowest score is the final performance score.

All of [F1 Page Speed Insights](https://f1-page-speed-insights.netlify.app/){title="PageSpeed Insights"}{target=\_blank}{rel=noopener} data comes from the Chrome UX Report which is collected from real-world users over the last 28 days.

Credits to [Treo](https://treo.sh/){title="Treo.sh"}{target=\_blank}{rel=noopener} for this approach!
