import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getTeamData, updateUser } from '../../../api/api';
import { firstNameValidation, formatDate, getAllTeamData, lastNameValidation, mobileValidation, mutationData, projectValidation } from '../CommonFunction';
import FormFields from './formField/FormFields';
import FormFieldSection from './formField/FormFieldSection';
import { projectOptions } from '../../../@core/constants';

const schema = yup.object().shape({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  mo: mobileValidation,
  project: projectValidation,
});

const UserProfile = () => {
  const navigate = useNavigate();
  const userEmail = JSON.parse(localStorage?.getItem('loginData'))?.email;

  const teamData = getAllTeamData('teamData', getTeamData);

  const mutation = mutationData('teamData', updateUser);

  const currentUser = teamData?.team?.find((user) => user?.email === userEmail) || {};

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      mo: '',
      project: '',
    },
  });

  useEffect(() => {
    if (currentUser) {
      setValue('firstName', currentUser?.firstName || '');
      setValue('lastName', currentUser?.lastName || '');
      setValue('mo', currentUser?.mo || '');
      setValue('project', currentUser?.project || '');
    }
  }, [currentUser, setValue]);

  const onSubmit = (data) => {
    const userToPromote = teamData?.team?.find(user => user?.email === userEmail);
    if (userToPromote) {
      toast.success('Data update Successfully !');
      mutation.mutate({ ...userToPromote, ...data });
    }
  };

  const handleUserProfileDashboard = () => {
    navigate(-1);
  };

  return (
    <div className='bg-dark text-light main-profile-section'>
      <div className='p-4 d-flex align-items-center'>
        <h4 className='m-0 user-profile-dashboard' onClick={handleUserProfileDashboard}>
          Dashboard
        </h4>
        <span className='mx-2 text-secondary'>
          <i className='fa-solid fa-house'></i>
        </span>
      </div>

      <div className='d-flex justify-content-center'>
        <div className='details-section'>
          <h3 className='p-3 border-bottom border-gray'>My Profile</h3>
          <div className='pt-2'>
            <form onSubmit={handleSubmit(onSubmit)}>

              <FormFieldSection>
                <FormFields title='First name:' data={{ ...register('firstName') }} placeholder='First name' error={errors.firstName?.message} />
                <FormFields title='Last name:' data={{ ...register('lastName') }} placeholder='Last name' error={errors.lastName?.message} />
              </FormFieldSection>

              <FormFieldSection>
                <FormFields title='Email:' value={currentUser?.email || ''} placeholder='Email' disabled={true} />
                <FormFields title='Username:' value={currentUser?.username || ''} placeholder='Username' disabled={true} />
              </FormFieldSection>

              <FormFieldSection>
                <FormFields title='Role:' value={currentUser?.role || ''} placeholder='Role' disabled={true} />
                <FormFields title='Join Date:' value={formatDate(currentUser?.date) ?? ''} placeholder='Date' disabled={true} />
              </FormFieldSection>

              <FormFieldSection>
                <FormFields title='Mo:' data={{ ...register('mo') }} placeholder='Mo' error={errors.mo?.message} />
                <FormFields
                  title='Project:'
                  data={{ ...register('project') }}
                  value={currentUser?.project || ''}
                  placeholder='Select a project'
                  options={projectOptions}
                  isSelect
                  error={errors.project?.message}
                />
              </FormFieldSection>

              <div className='text-end'>
                <button className='save-button m-3 bg-dark text-light px-3' type='submit'>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
