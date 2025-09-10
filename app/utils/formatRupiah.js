function formattedRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(number)
    .replace(/\s/g, "");
}

module.exports = formattedRupiah;
