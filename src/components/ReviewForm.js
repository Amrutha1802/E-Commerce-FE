import React from 'react'
import * as Yup from 'yup'
import { Formik,Form,ErrorMessage,Field } from 'formik'
import '../Styles/Reviewform.css'
import { useMutation,useQueryClient } from 'react-query'
import axios from 'axios'

const initialValues={
    name:'',
    email:'',
    rating:'',
    review:''
}

const validationSchema=Yup.object({
    name: Yup.string().required('Name is Required'),
    email:Yup.string().email('Invalid email Format').required('Email is Required'),
    rating:Yup.number().required("Please give a rating").min(1,'Rating value must be greater than 1').max(5,'Rating value must be less than or equal to 5'),
    review:Yup.string().required('Review is Required')
})

export default function ReviewForm({id}) {
  const queryClient = useQueryClient();
  const addReviewMutation = useMutation(
    (newReview) => 
    {
      newReview.productid=id;
      return axios.post("http://localhost:4000/reviewsdata",newReview)
  },
    {
      onSuccess:()=>{
        console.log("Review Added Successfully");
        queryClient.invalidateQueries('newData');
      },
      onError:(error)=>{
        console.error('Error adding Review',error);
      }
    },'newdata');
      const onSubmit=(values,{resetForm})=>{
      console.log('Form values',values);
      values.productid=id;
      addReviewMutation.mutate(values, {
        onError: (error) => {
          console.error('Error adding review:', error);
        }
      });
      resetForm();
  }
  return (
    <div className='review'>
      <h1>Form</h1>
      <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          <Form> 
              <div className='form-comp'>
              <label htmlfor='name' >Name  </label>
              <Field type='text' 
                  id='name' 
                  name='name'
                  placeholder='Enter Your Name'
              />
              </div>
              <ErrorMessage name='name' component="div" className="error-text" />

              <div className='form-comp'>
              <label htmlfor='email'>E-mail  </label>
              <Field type='email' 
                  id='email' 
                  name='email' 
                  placeholder='Enter Your E-Mail'
              />
              </div>
              <ErrorMessage name='email' component="div" className="error-text"/>

              <div className='form-comp'>
              <label htmlfor='rating' >Rating </label>
              <Field type='text' 
                  id='rating' 
                  name='rating' 
                  placeholder='Enter Rating'
              />
              </div> 
              <ErrorMessage name='rating' component="div" className="error-text"/>

              <div className='form-comp'>
              <label htmlfor='review' >Review  </label>
              <Field type='text' 
                  id='review' 
                  name='review' 
                  placeholder='Enter Review'
              />
              </div>
              <ErrorMessage name='review' component="div" className="error-text"/>

              <button type='submit' className='prod-button'>Submit</button>      
          </Form>
      </Formik>
      {addReviewMutation.isSuccess && <p>Review Added Successfully</p>}
    </div>
  )
}


 