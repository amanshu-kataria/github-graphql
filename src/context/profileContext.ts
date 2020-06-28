import React, { useContext } from 'react';
import { IGithubProfile } from '../interfaces/profile';

export const ProfileContext = React.createContext<IGithubProfile>({});
export const useProfileContext = () => useContext<IGithubProfile>(ProfileContext);
