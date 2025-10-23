import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useFieldConditions } from '@/features/fields/hooks/fieldConditions.hooks';
import { FieldConditionForm } from '@/features/fields/components/form/FieldConditionForm';

interface AddFieldConditionModalProps {
  fieldId: number;
  fieldName: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const AddFieldConditionModal: React.FC<AddFieldConditionModalProps> = ({
  fieldId,
  fieldName,
  isOpen,
  onClose,
  onSuccess,
}) => {
  // Fetch data here, in the container
  const { data: existingConditions, isLoading: isLoadingConditions } =
    useFieldConditions(fieldId);

  // The modal is now only responsible for the Dialog shell
  // and for passing data down to the form.
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Додати дані про стан поля "{fieldName}"</DialogTitle>
        </DialogHeader>

        {/* Render the form component.
          When the modal closes, this component will unmount,
          which automatically clears its state.
        */}
        <FieldConditionForm
          fieldId={fieldId}
          existingConditions={existingConditions}
          isLoadingConditions={isLoadingConditions}
          onClose={onClose}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddFieldConditionModal;
