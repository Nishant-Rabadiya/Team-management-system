import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import FormSubmitButton from '../../../components/form/FormSubmitButton';
import FormFooterLink from '../../../components/form/FormFooterLink';
import FormLayout from '../../../components/form/FormLayout';
import { getTeamData, updateUser } from '../../../api/api';
import { getAllTeamData, mutationData } from '../../../components/dashboard/CommonFunction';
import { FormFields } from '../../../components/form/FormFields';
import { loginSchema } from '../../../components/form/FormSchema';
import { useQuery } from '@tanstack/react-query';

const Login = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  // No need to use team data in login page
  // const teamData = getAllTeamData('teamData', getTeamData);

  const { data: teamData } = useQuery({
    queryKey: ['teamData'],
    queryFn: getTeamData,
    staleTime: Infinity
  });

  const mutation = mutationData('teamData', updateUser);

  const onSubmit = (data) => {
    const currentUser = teamData?.team?.find(user => user?.email === data?.email && user?.password === data?.password);
    if (!(currentUser)) {
      toast.error(`Email or password dosn't match!`);
    } else {
      localStorage.setItem('loginData', JSON.stringify({ email: data?.email }));
      mutation.mutate({ ...currentUser, loginTime: Date.now() });
      toast.success('Login successfully !');
      navigate(`/dashboard`);
    }
  }

  return (
    <FormLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-heading-section'>
          <h1 className='form-heading'>Login Account</h1>
        </div>

        <FormFields title='Email:' data={{ ...register('email') }} placeholder='Enter Your Email!' error={errors.email?.message} />

        <FormFields title='Password:' data={{ ...register('password') }} placeholder='Enter Your password!' error={errors.password?.message} />

        <div className='footer-section text-center'>
          <FormSubmitButton button='Login' />
          <FormFooterLink title={`Don't have an account?`} path='/' name='Register here' />
        </div>

      </form>
    </FormLayout>
  )
};

export default Login;

