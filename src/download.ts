import { jsPDF } from "jspdf";

const download = () => {
    const pdf = new jsPDF();
    pdf.deletePage(1)

    document.querySelectorAll("img").forEach(img => {
        if (!/^blob:/.test(img.src)) {
            return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, img.width, img.height);
        const imgData = canvas.toDataURL("image/jpeg", 1.0);

        pdf.addPage([img.width, img.height], 'landscape')
        pdf.addImage(imgData, 'JPEG', 0, 0, img.width, img.height);
    });

    const filename = /(.*) - /.exec(document.title)[1]
    if (filename.endsWith('.pdf')) {
        pdf.save(filename);
    }
    else {
        pdf.save(filename + ".pdf");
    }
}

const button = document.createElement('button')
button.textContent = 'DL'

button.style.position = 'absolute'
button.style.right = '10px'
button.style.bottom = '10px'
button.style.zIndex = '100'

button.addEventListener('click', download)

document.body.appendChild(button)
