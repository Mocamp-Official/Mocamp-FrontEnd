import React from 'react';
import OnboardingHeader from './OnboardingHeader';
import BasicHeader from './BasicHeader';
import CreateJoinHeader from './CreateJoinHeader';
import WorkspaceHeader from './WorkSpaceHeader';

interface HeaderProps {
  status: 'onboarding' | 'basicHeader' | 'createjoin' | 'workspace';
}

const HEADER_COMPONENTS = {
  onboarding: OnboardingHeader,
  basicHeader: BasicHeader,
  createjoin: CreateJoinHeader,
  workspace: WorkspaceHeader,
};

const Header = ({ status }: HeaderProps) => {
  const SelectedHeader = HEADER_COMPONENTS[status];
  return SelectedHeader ? <SelectedHeader /> : null;
};

export default Header;
