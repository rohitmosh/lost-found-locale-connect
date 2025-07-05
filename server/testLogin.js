const axios = require('axios');

async function testLogin() {
  try {
    console.log('Testing login API with Aditya\'s credentials...');
    
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'aditya.sharma@gmail.com',
      password: 'Aditya@123'
    });
    
    console.log('Login successful!');
    console.log('Full response structure:', JSON.stringify(response.data, null, 2));
    
    // Access user data based on the actual structure
    const userData = response.data.data && response.data.data.user ? response.data.data.user : response.data.data;
    
    if (userData) {
      console.log('\nUser data:');
      console.log('- ID:', userData._id);
      console.log('- Name:', userData.name);
      console.log('- Email:', userData.email);
      console.log('- Phone Number:', userData.phoneNumber);
      console.log('- Profile Picture:', userData.profilePicture);
      console.log('- Trust Score:', userData.trustScore);
      console.log('- Created At:', userData.createdAt);
      console.log('- Verified Email:', userData.verifiedEmail);
      console.log('- Verified Phone:', userData.verifiedPhone);
    }
    
    console.log('\nToken:', response.data.data.token ? response.data.data.token.substring(0, 20) + '...' : 'No token found');
  } catch (error) {
    console.error('Login failed!');
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }
  }
}

testLogin(); 