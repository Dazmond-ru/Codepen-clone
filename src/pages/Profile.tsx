import './Profile.scss';

import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { fetchAuthUpdate } from '../redux/slices/auth';
import { RootState, useAppDispatch } from '../redux/store';

export const Profile = () => {
  const userName = useSelector((state: RootState) => state.auth.data?.name);
  const userLogin = useSelector((state: RootState) => state.auth.data?.username);
  const userAvatarUrl = useSelector((state: RootState) => state.auth.data?.avatar);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isEditName, useEditName] = useState(false);
  const [profileName, useProfileName] = useState(userName);

  const dispatch = useAppDispatch();

  const onBtn = () => {
    useEditName(!isEditName);
  };

  const onBlurInput = () => {
    const newName = nameInputRef.current?.value as string;
    useProfileName(newName);
    useEditName(false);
    dispatch(fetchAuthUpdate({ name: newName }));
  };

  const onFocusInput = () => {
    (nameInputRef.current as HTMLInputElement).value = userName as string;
  };

  useEffect(() => {
    nameInputRef.current?.focus();
  });

  return (
    <div className="profile">
      <div className="profile-header">
        <span
          onClick={onBtn}
          className={cn({ 'profile-name': true, isVisHidden: isEditName })}
          title="You can change name"
        >
          {profileName || userName}
        </span>
        <input
          ref={nameInputRef}
          type="text"
          className={cn({ 'profile-name_input': true, isVisHidden: !isEditName })}
          onFocus={onFocusInput}
          onBlur={onBlurInput}
        ></input>
        <div className="profile-login">{`@${userLogin}`}</div>
        <img className="profile-avatar" src={userAvatarUrl} alt={`User Avatar of ${userName}`}></img>
      </div>
      <div className="profile-manage-avatar">
        <span className="profile-avatar_update" onClick={() => inputFileRef.current?.click()}>
          Upload Avatar
        </span>
        <span>|</span>
        <span className="profile-avatar_remove">Remove Avatar</span>
      </div>
      <input ref={inputFileRef} type="file" /*onChange={handleChangeFile}*/ hidden />
    </div>
  );
};
