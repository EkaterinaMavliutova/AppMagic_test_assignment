const attachScreenshotToReport = async (locator, name, testInfo) => {
  const screenshot = await locator.screenshot();

  testInfo.attach(name, {
    body: screenshot,
    contentType: "image/png",
  });
};

export default attachScreenshotToReport;
