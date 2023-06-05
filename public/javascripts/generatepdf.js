
//unksione generate pdf
// window.jsPDF = window.jspdf.jsPDF;
// var doc = new jsPDF();
// var elementHTML = document.querySelector("#section");
// // Source HTMLElement or a string containing HTML.
// doc.html(elementHTML, {
//     callback: function(doc) {
//         // Save the PDF
//         doc.save('sample-document.pdf');
//     },
//     x: 55,
//     y: 55,
//     width: 150, //target width in the PDF document
//     windowWidth: 950 //window width in CSS pixels

// });


//funksioni print
function imprimir() {
    var divToPrint=document.getElementById("section");
    newWin= window.open("");
    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    newWin.close();
}











//TESTE FUNKSIONESH
// function convertToPDF() {
//     const doc = new jsPDF();
//     const table = document.getElementById('section');
//     doc.autoTable({ html: table });
//     doc.save('table.pdf');
//   }
// function generatePDF() {
//     var elementHTML = document.querySelector("#section");
//     var doc = new jsPDF();
//     doc.html(elementHTML, {
//       callback: function(doc) {
//         // Save the PDF
//         doc.save('sample-document.pdf');
//       },
//       x: 55,
//       y: 55,
//       width: 150,
//       windowWidth: 950
//     });
//   }
//   var button = document.getElementById("generatepdf");
//   button.addEventListener("click", generatePDF);

// function printTable() {
//     window.print();
//   }

// const printButton = document.getElementById('printButton');
// printButton.addEventListener('click', printTable);

// function PrintTable() {
//     var printWindow = window.open('', '', 'height=200,width=400');
//     printWindow.document.write('<html><head><title>Table Contents</title>');

//     //Print the Table CSS.
//     var table_style = document.getElementById("table_style").innerHTML;
//     printWindow.document.write('<style type = "text/css">');
//     printWindow.document.write(table_style);
//     printWindow.document.write('</style>');
//     printWindow.document.write('</head>');

//     //Print the DIV contents i.e. the HTML Table.
//     printWindow.document.write('<body>');
//     var divContents = document.getElementById("table").innerHTML;
//     printWindow.document.write(divContents);
//     printWindow.document.write('</body>');

//     printWindow.document.write('</html>');
//     printWindow.document.close();
//     printWindow.print();
// }




 // Initialize generatePDF to false

// Event listener for the button
