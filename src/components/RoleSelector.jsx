import { UserIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

const RoleSelector = ({ selectedRole, onSelectRole }) => {
  const roles = [
    {
      id: 'developer',
      title: 'Developer',
      description: 'Find your dream job',
      icon: UserIcon,
    },
    {
      id: 'recruiter',
      title: 'Recruiter',
      description: 'Hire top talent',
      icon: BriefcaseIcon,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {roles.map((role) => {
        const Icon = role.icon;
        const isSelected = selectedRole === role.id;
        return (
          <button
            key={role.id}
            onClick={() => onSelectRole(role.id)}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
              isSelected
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center ${
                isSelected
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-textSecondary'
              }`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-textPrimary mb-1">
              {role.title}
            </h3>
            <p className="text-textSecondary text-sm">{role.description}</p>
          </button>
        );
      })}
    </div>
  );
};

export default RoleSelector;
