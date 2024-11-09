import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import FormSubmitButton from '../../../components/form/FormSubmitButton';
import FormFooterLink from '../../../components/form/FormFooterLink';
import UserRole from '../../../components/form/UserRole';
import FormLayout from '../../../components/form/FormLayout';
import { getTeamData, sendRegistrationData } from '../../../api/api';
import { getAllTeamData, mutationData } from '../../../components/dashboard/CommonFunction';
import { FormFields } from '../../../components/form/FormFields';
import { registrationUserRole } from '../../../@core/constants';
import { registrationSchema } from '../../../components/form/FormSchema';

const Registration = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(registrationSchema)
  });

  const registrationData = getAllTeamData('teamData', getTeamData);

  const mutation = mutationData('teamData', sendRegistrationData);

  const onSubmit = (data) => {
    if (registrationData?.team?.find(email => email?.email === data?.email)) {
      toast.error('Email must be unique !');
      return;
    } else if (registrationData?.team?.find(username => username?.username === data?.username)) {
      toast.error('Username must be unique !');
      return;
    }

    toast.success('Registration Successfully !');
    mutation.mutate({ ...data, date: Date.now() });
    navigate('/login');

  };

  return (
    <FormLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-heading-section'>
          <h1 className='form-heading'>Register Your Account</h1>
        </div>

        <FormFields title='First Name:' data={{ ...register('firstName') }} placeholder='Enter Your First Name!' error={errors.firstName?.message} />

        <FormFields title='Last Name:' data={{ ...register('lastName') }} placeholder='Enter Your Last Name!' error={errors.lastName?.message} />

        <FormFields title='Email:' data={{ ...register('email') }} placeholder='Enter Your Email!' error={errors.email?.message} />

        <FormFields title='Username:' data={{ ...register('username') }} placeholder='Enter Your Username!' error={errors.username?.message} />

        <FormFields title='Password:' data={{ ...register('password') }} placeholder='Enter Your password!' error={errors.password?.message} />

        <UserRole title='Select Role:' data={{ ...register('role') }} roles={registrationUserRole} />

        <div className='footer-section text-center'>
          {/* Make common button as suggested */}
          <FormSubmitButton button='Register' />
          {/* Remove this component, it will be okay if we can use in same component */}
          <FormFooterLink title='Already have an account?' path='/login' name='Login' />
        </div>

      </form>
    </FormLayout>
  )
};

export default Registration;
