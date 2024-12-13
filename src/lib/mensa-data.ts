const formatDate = (date: Date) => date.toISOString().split("T")[0];

export async function getMensaMenu() {
  const today = new Date();

  // Calculate the first day of the week (Monday)
  const thisMonday = new Date(today);
  const mondayOffset = today.getDay() === 0 ? -6 : 1 - today.getDay();
  thisMonday.setDate(today.getDate() + mondayOffset);

  // Next Monday
  const nextMonday = new Date(today);
  const nextMondayOffset = today.getDay() === 0 ? 1 : 8 - today.getDay();
  nextMonday.setDate(today.getDate() + nextMondayOffset);

  const formData = new URLSearchParams();
  formData.append("func", "make_spl");
  formData.append("locId", "1");
  formData.append("lang", "de");
  formData.append("date", formatDate(today));
  formData.append("startThisWeek", formatDate(thisMonday));
  formData.append("startNextWeek", formatDate(nextMonday));

  const url =
    "https://sw-ulm-spl51.maxmanager.xyz/inc/ajax-php_konnektor.inc.php";

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const htmlContent = await response.text();

  return htmlContent;
}
