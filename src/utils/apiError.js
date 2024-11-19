import { toast } from 'react-toastify'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'

function handleError(error) {
  if (axios.isAxiosError(error) && error.response) {

    const statusCode = error.response.status

    switch (statusCode) {
      case 404:
        toast.error('Not found: The requested resource was not found.');
        break;
      case 429:
        toast.warning('Rate Limited: Too many requests, please try again later.');
        break;
      default:
        if (statusCode >= 500) {
          toast.error('Server Error: An internal server error occurred.');
        }
        break;
    }
    
    if (error.message === 'Network Error') {
      toast.error('No internet connection. Please check your network connection.');
    }    

  } else if (error.request) {
    toast.error('No response received from the server.')
  } else {
    toast.error('An unexpected error occurred:')
    console.log(error)
  }

  throw error
}

export default handleError
