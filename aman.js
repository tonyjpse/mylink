setInterval(function () {
  var link = document.getElementById("credit-link");
  // URL
  var urlTujuan = "https://www.onlapak.my.id"; 

  if (link == null || link.getAttribute("href") != urlTujuan) {
    document.body.innerHTML = "<div style='text-align:center;margin-top:20%;'><h1>AKSES DITOLAK!</h1><p>Link Kredit telah diubah.</p></div>";
    window.location.href = urlTujuan;
  }
}, 5000);
