import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Input,
  DialogActions,
  Button
} from '@material-ui/core'

import api from '../services/api';

const ConfirmationDialogRaw = (props) => {
  const { onClose, value: valueProp, open, name, uid, patientId, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const [fisios, setFisios] = React.useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('/fisio');
      setFisios(response.data)
    }
    fetchData();
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open])

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">Selecione o fisioterapeuta que deseja associar ao(a) paciente {name}</DialogTitle>
      <DialogContent dividers>
        <FormControl style={{
          minWidth: 130,
        }}>
          <InputLabel id="demo-dialog-select-label">Fisioterapeuta</InputLabel>
          <Select
            labelId="demo-dialog-select-label"
            id="demo-dialog-select"
            value={value}
            input={<Input />}
            onChange={handleChange}
          >
            {fisios.filter(fisio => fisio.uid !== uid).map(
              fisio =>
                (<MenuItem value={fisio.uid}>{fisio.displayName || fisio.email}</MenuItem>))
            }
          </Select> 
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
          </Button>
        <Button onClick={handleOk} color="primary">
          Ok
          </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default ConfirmationDialogRaw;