import React from 'react'
import Dialog from '@mui/material/Dialog';
import { Box, InputBase, Typography ,styled , InuputBase ,TextField , Button} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useState } from 'react';
import useAPi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';


const dialogStyle = {
    height: '90%',
    width: '80%',
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow: 'none',
    borderRadius:'10px 10px 0 0'
}

const Header = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 15px',
    background: '#f2f6fc',
    '& > p': {
        fontSize: 14,
        fontWeight: 500,
    }
})

const RecipientsWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    padding: ' 0 15px',
    '& >div': {
        fontSize: 14,
        borderBottom: '1px solid #F5F5F5',
        marginTop: 10,
        
    }
})

const Footer = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 15px',
    alignItems: 'center',
    
})

const SendButton = styled(Button)({
    background: '#0B57D0',
    color: '#fff',
    fontWeight: 500,
    textTransform: 'none',
    borderRadius: 18,
    width:100
})

const ComposeMail = ({ openDialog, setOpenDialog }) => {

    const [data, setData] = useState({});
    const sentEmailService = useAPi(API_URLS.saveSentEmail);
    const saveDraftService = useAPi(API_URLS.saveDraftEmails);

    // we have to store the data from subject and all from using event method and using hooks
    const onValueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        // console.log(data);
    }
    
    const config = {
       Host : "smtp.elasticemail.com",
       Username : process.env.REACT_APP_USERNAME,
       Password: process.env.REACT_APP_PASSWORD ,
       port:2525,
    }
    
    const closeComposeMail = (e) => {
        e.preventDefault();
        // setOpenDialog(false);

           const payload = {
            to: data.to,
            from: "gundalekedar@gmail.com",
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: 'Kedar Gundale',
            starred: false,
            type: 'drafts'
        };
        
        saveDraftService.call(payload);

        if (!saveDraftService.error) {
            setOpenDialog(false);
            setData({});
        } else {
            
        }
    }

    const sendEMail = async (e) => {
        e.preventDefault();

        if (window.Email) {
       window.Email.send({
       ...config,
       To : data.to,
       From : "gundalekedar@gmail.com",
       Subject : data.subject,
       Body : data.body
    }).then(
  message => alert(message)
    );
        
        }
        
        //api mai information send karne ke liye

        const payload = {
            to: data.to,
            from: "gundalekedar@gmail.com",
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: 'Kedar Gundale',
            starred: false,
            type: 'sent'
        };
        
        sentEmailService.call(payload);

        if (!sentEmailService.error) {
            setOpenDialog(false);
            setData({});
        } else {
            
        }
   
        setOpenDialog(false);
}

  return (
      <Dialog
          open={openDialog}
          PaperProps={{sx:dialogStyle}}
      >
          <Header>
              <Typography>New Message</Typography>
              <CloseIcon fontSize='small' onClick={(e)=>closeComposeMail(e)}></CloseIcon>
          </Header>
          <RecipientsWrapper>
              <InputBase placeholder='Recipients' name="to" onChange={(e)=>onValueChange(e)} ></InputBase>
              <InputBase placeholder='Subject' name="subject" onChange={(e)=>onValueChange(e)}></InputBase>
          </RecipientsWrapper>
          <TextField
              multiline
              rows={20}
              sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
              onChange={(e) => onValueChange(e)}
              name="body"
          ></TextField>
          <Footer>
              <SendButton onClick={(e)=>sendEMail(e)}>send</SendButton>
              <DeleteForeverOutlinedIcon onClick={()=> setOpenDialog(false)} />
          </Footer>
      </Dialog>
  )
}

export default ComposeMail;
