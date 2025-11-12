import axiosInstance from "@/lib/axiosInstance";

const downloadCertificate = async (fullName) => {
    if (!fullName || fullName?.trim() === "") {
        alert("Failed to download your certificate, please reach out to us on our whatsapp community");
        return;
    }

    try {
        const response = await axiosInstance.get(`/certificate?name=${encodeURIComponent(fullName)}`, {
            responseType: 'blob' // This tells axios to handle the response as a Blob
        });

        // Create a URL for the blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        
        // Create a temporary anchor element
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `GSSOC_Certificate_${fullName.replace(/\s+/g, '_')}.png`);
        
        // Append to body, click and remove
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        setTimeout(() => {
            link.remove();
            window.URL.revokeObjectURL(url);
        }, 100);
    } catch (error) {
        console.error('Error downloading certificate:', error);
        alert('Failed to download certificate. Please try again later.');
    }
};

export default downloadCertificate;