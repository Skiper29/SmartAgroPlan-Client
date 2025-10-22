import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useDeleteField } from '@/features/fields/hooks/fields.hooks';
import type Field from '@/models/field/field.model';

interface DeleteFieldModalProps {
  field: Field | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const DeleteFieldModal: React.FC<DeleteFieldModalProps> = ({
  field,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const deleteField = useDeleteField();

  const handleDelete = async () => {
    if (!field) return;

    try {
      await deleteField.mutateAsync(field.id);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error deleting field:', error);
    }
  };

  if (!field) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-600">Видалити поле</DialogTitle>
          <DialogDescription className="space-y-2">
            <p>
              Ви впевнені, що хочете видалити поле{' '}
              <span className="font-semibold">"{field.name}"</span>?
            </p>
            <p className="text-sm text-muted-foreground">
              Ця дія незворотна. Всі дані, пов'язані з цим полем, будуть
              видалені.
            </p>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={deleteField.isPending}
          >
            Скасувати
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteField.isPending}
          >
            {deleteField.isPending ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Видалення...
              </div>
            ) : (
              'Видалити'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteFieldModal;
