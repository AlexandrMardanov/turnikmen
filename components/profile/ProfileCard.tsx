import { EditNameModal } from './components/EditNameModal';
import { ProfileInfo } from './components/ProfileInfo';
import { useProfileEdit } from './hooks/useProfileEdit';

export function ProfileCard() {
  const { name, setName, isModalVisible, isSaving, handleSaveName, handleCancelEdit, openModal, user } =
    useProfileEdit();

  return (
    <>
      <ProfileInfo name={name} email={user?.email || ''} onEditPress={openModal} />
      <EditNameModal
        visible={isModalVisible}
        name={name}
        onChangeName={setName}
        onSave={handleSaveName}
        onCancel={handleCancelEdit}
        isSaving={isSaving}
      />
    </>
  );
}
