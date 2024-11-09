import React from 'react';
import { handleTeamChange } from '../CommonFunction';

const TeamActionButton = ({ user, currentUser, teamData, mutation }) => {
    const isInTeam = user?.reportsTo === currentUser?.id;

    const handleToggleTeam = () => {
        const action = isInTeam ? 'remove' : 'add';
        handleTeamChange(user?.id, action, teamData, currentUser?.email, mutation);
    };

    return (
        <button
            className={`bg-dark text-light addremove-team-button`}
            onClick={handleToggleTeam}
        >
            {isInTeam ? 'Remove from Team' : 'Add to Team'}
        </button>
    );
};

export default TeamActionButton;
