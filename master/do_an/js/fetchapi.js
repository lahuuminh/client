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
  //vi du post async
  try {
    let response = await fetch(host + '/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Adjust content type if needed
      },
      body: JSON.stringify(newuser),
    });

    if (!response.ok) {
      throw new Error(`Lỗi mạng hoặc lỗi HTTP, mã lỗi: ${response.status}`);
    }

    const responseData = await response.json();
    await fetchUser();
    displayUserManagement(userList);
    return responseData; // Return the response data
  } catch (error) {
    console.error('Xảy ra lỗi khi gửi yêu cầu:', error);
    throw error; // Re-throw the error for further handling (optional)
  }
  
  async function putData(url, data) {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
    }
}
async function deleteData(url) {
  try {
      const response = await fetch(url, {
          method: 'DELETE'
      });
      const result = await response.json();
      console.log(result);
  } catch (error) {
      console.error('Error:', error);
  }
}

deleteData('https://example.com/api/delete/1');

async function getData(url) {
  try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
  } catch (error) {
      console.error('Error:', error);
  }
}

getData('https://example.com/api/data');
