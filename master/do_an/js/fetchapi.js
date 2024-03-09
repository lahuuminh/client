function postData(url , data) {
    // Thực hiện yêu cầu POST đến URL được cung cấp
    return fetch(url, {
      method: 'POST', // Phương thức HTTP là POST
      headers: {
        'Content-Type': 'application/json' // Đặt kiểu nội dung là JSON
      },
      body: JSON.stringify(data) // Chuyển đổi dữ liệu thành chuỗi JSON trước khi gửi
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Lỗi mạng hoặc lỗi HTTP, mã lỗi: ' + response.status);
      }
      return response.json(); // Trả về dữ liệu JSON từ phản hồi
    })
    .catch(error => {
      console.error('Xảy ra lỗi:', error);
      throw error; // Ném lỗi tiếp theo để xử lý ở đâu đó khác nếu cần
    });
  }
  
