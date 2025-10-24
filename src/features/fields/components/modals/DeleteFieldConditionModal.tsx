// src/features/fields/components/modals/DeleteFieldConditionModal.tsx
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
import { useDeleteFieldCondition } from '@/features/fields/hooks/fieldConditions.hooks';
import type { FieldCondition } from '@/models/field/field-condition.model';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { extractErrorMessage, type ApiError } from '@/types/api-error.type';

interface DeleteFieldConditionModalProps {
  condition: FieldCondition | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const DeleteFieldConditionModal: React.FC<DeleteFieldConditionModalProps> = ({
  condition,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const deleteMutation = useDeleteFieldCondition();

  const handleDelete = async () => {
    if (!condition) return;

    try {
      await deleteMutation.mutateAsync(condition.id);
      toast.success('Запис стану поля видалено!');
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error deleting field condition:', error);
      toast.error(
        `Помилка: ${extractErrorMessage(error as ApiError) || 'Не вдалося видалити запис.'}`,
      );
    }
  };

  if (!condition) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-600">
            Видалити запис стану поля
          </DialogTitle>
          <DialogDescription className="space-y-2">
            <p>
              Ви впевнені, що хочете видалити запис стану поля від{' '}
              <span className="font-semibold">
                {format(new Date(condition.recordedAt), 'PPP HH:mm', {
                  locale: uk,
                })}
              </span>
              ?
            </p>
            <p className="text-sm text-muted-foreground">Ця дія незворотна.</p>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={deleteMutation.isPending}
          >
            Скасувати
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'Видалення...' : 'Видалити'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteFieldConditionModal;
