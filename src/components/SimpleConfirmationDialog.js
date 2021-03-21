import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core'

/**
 * Componente de modal de confirmação com um botão de cancelamento e um botão
 * de confirmação.
 * @param {object} param0 - Objeto com as seguintes propriedades do componente:
 * @param {string} title - título da janela modal
 * @param {string} message - mensagem a ser exibida no corpo do modal
 * @param {string} cancelText - texto do botão de cancelamento
 * @param {string} confirmText - texto do botão de confirmação
 * @param {boolean} open - indica se o modal deve ser exibido ou não
 * @param {function} onConfirm - ação do botão de confirmação
 * @param {function} onClose - ação do botão de cancelamento
 */
const SimpleConfirmationDialog = ({title, message, cancelText, confirmText, 
  open, onConfirm, onClose}) => {

  return (
    <Dialog
      open={open}>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message}
        </DialogContentText>  
      </DialogContent>
      <DialogActions>
        <Button onClick={e => onClose()}>{cancelText}</Button>
        <Button onClick={e => {onConfirm()}}>{confirmText}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleConfirmationDialog;