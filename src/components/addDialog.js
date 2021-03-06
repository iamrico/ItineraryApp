import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';
import add from '../images/add (1).svg';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { ListItem,List } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import firestoreDB from '../components/firestore.js';
import InputAdornment from '@material-ui/core/InputAdornment';
import firestoreStorage from '../components/storage.js';
import { makeStyles } from '@material-ui/core/styles';
import { amber, green } from '@material-ui/core/colors';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';

// const useStyles1 = makeStyles(theme => ({
//   success: {
//     backgroundColor: green[600],
//   },
//   error: {
//     backgroundColor: theme.palette.error.dark,
//   },
//   info: {
//     backgroundColor: theme.palette.primary.main,
//   },
//   warning: {
//     backgroundColor: amber[700],
//   },
//   icon: {
//     fontSize: 20,
//   },
//   iconVariant: {
//     opacity: 0.9,
//     marginRight: theme.spacing(1),
//   },
//   message: {
//     display: 'flex',
//     alignItems: 'center',
//   },
// }));

const styles = theme => (
    {
        avatar: {
          backgroundColor: blue[100],
          color: blue[600],
        },
        card:{
            maxWidth:'xl',
        },
        container: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        button:{
            margin:'auto'
        },
        textField: {
          marginLeft: theme.spacing.unit,
          marginRight: theme.spacing.unit,
          width: 200,
        },
        menu: {
          width: 200,
        },
        textArea: {
            width:500
        },
        loc: {
            marginLeft:'50px'
        },
        loc2 :{
            marginLeft:'40px',
            marginRight:'30px'
        }
      }
);

const category = [
    'Transport',
    'Item',
    'Expense',
    'Misc'
]

  const storageService = firestoreStorage;
  const storageRef = storageService.ref();

class MyDialog extends React.Component {

  state = {
      title:"",
      location:"",
      actionInput:[{name:'',cost:'',category:'',comment:''}],
      description:"",
      totalCost:0,
      image:'',
      open:false
  }
  
  
  handleClose = (event) => {

        this.props.onClose();
 
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleActionChanged = (inputType, ndx, value) => {
    const newActionsInput = [...this.state.actionInput]
    newActionsInput[ndx][inputType] = value

    this.setState({ actionInput: newActionsInput })
  }


  addNewInput = ()=>{
      this.setState({actionInput:[...this.state.actionInput,{name:'Action'+(this.state.actionInput.length+1)}]})
  }

  handleSBClose = ()=> {
    this.setState({open:false});
  }

  onSubmit = async () =>{


      this.handleClose();

      let image;

      image =  await this.handleFileUploadSubmit();
        let newDocument = {
            title:this.state.title,
            description:this.state.description,
            datePosted: new Date(),
            isFeaturedItem:false,
            totalCost:this.state.totalCost,
            location:this.state.location,
            image:image
        }

        for(let i=0;i<this.state.actionInput.length;i++){
          
            let cost = parseFloat(this.state.actionInput[i].cost);
            newDocument.totalCost +=cost;
        }
  
        let length = this.state.actionInput.length;
        let actionData = [...this.state.actionInput];
        
        const variable = await firestoreDB.collection("itineraries").add({...newDocument}).then(async function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          const itineraryRef = await firestoreDB.collection('itineraries').doc(docRef.id);
  
          for(let i=0;i<length;i++){
              itineraryRef.collection("actions").add({...actionData[i]})
          }
          return 1;
        }).catch(function(error) {
              console.error("Error adding document: ", error);
        });
      
        if(variable){
          this.handleClose();
          this.openSnackBar();
        }
        
  }

  selectedFile;
  image;
  handleFileUploadChange = (e) =>{
    this.selectedFile = e.target.files[0];
  }

  handleFileUploadSubmit =  async (e) =>{

    const uploadTask =  await storageRef.child(`images/${this.selectedFile.name}`).put(this.selectedFile); //create a child directory called images, and place the file inside this directory
   
    return storageRef.child(`images/${this.selectedFile.name}`).getDownloadURL();
  }

  openSnackBar = () =>{
    this.setState({open:true});
  }
  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <div>
        <Snackbar
        onClose={this.handleSBClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.open}
        autoHideDuration={6000}
      >
        <MySnackbarContentWrapper
          onClose={this.handleSBClose}
          variant="success"
          message="This is a success message!"
        />
        </Snackbar>
        <Dialog fullWidth={true}  className={classes.card} onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">Add a new Itinerary</DialogTitle>
        <Divider/>
        <DialogContent>
            <DialogContentText>
                
                 <List>
                 
                    <ListItem>
                        <TextField
                            id="standard-name"
                            label="Title"
                            value={this.state.title}
                            onChange={this.handleChange('title')}
                            margin="normal"
                        />
                        <TextField className={classes.loc}
                            id="standard-name"
                            label="Location of Adventure"
                            value={this.state.location}
                            onChange={this.handleChange('location')}
                            margin="normal"
                        />
                    </ListItem>
                    <ListItem>
                        <TextField
                                id="standard-name"
                                multiline
                                rows="4"
                                className={classes.textArea}
                                label="Description"
                                value={this.state.description}
                                onChange={this.handleChange('description')}
                                margin="normal"
                        />
                    </ListItem>
                    <ListItem >
                        <Button className={classes.button} onClick={this.addNewInput}>
                          Add Action  <AddIcon/>
                        </Button>
                    </ListItem>
                    {
                        this.state.actionInput.map((item,i)=>{
                            
                            return(
                                <div key={i}>
                                    <ListItem>
                                        <TextField 
                                            id="standard-name"
                                            label={"Action"}
                                            value={this.state.actionInput[i].name}
                                            onChange={(event)=>this.handleActionChanged('name',i,event.target.value)}
                                            margin="normal"
                                        />
                                        <TextField 
                                            className={classes.loc2}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            }}
                                            id="standard-name"
                                            label={"Cost"}
                                            value={this.state.actionInput[i].cost}
                                            onChange={(event)=>this.handleActionChanged('cost',i,event.target.value)}
                                            margin="normal"
                                        />
                                        <TextField
                                            id="standard-select-currency"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                            }}
                                            raised
                                            select
                                            label="Category"
                                            className={classes.textField}
                                            value={this.state.actionInput[i].category}
                                            onChange={(event)=>this.handleActionChanged('category',i,event.target.value)}
                                            SelectProps={{
                                                MenuProps: {
                                                className: classes.menu,
                                                },
                                            }}
                                            margin="normal"
                                            variant="outlined"
                                            >
                                            {category.map(option => (
                                                <MenuItem key={option} value={option}>
                                                {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </ListItem>
                                    <ListItem>
                                        <TextField
                                                id="standard-name"
                                                multiline
                                                rows="4"
                                                className={classes.textArea}
                                                label="Comment"
                                                value={this.state.actionInput[i].comment}
                                                onChange={(event)=>this.handleActionChanged('comment',i,event.target.value)}
                                                margin="normal"
                                                variant="outlined"
                                        />
                                    </ListItem>
                                </div>
                                
                            );
                        })
                    }
                   <ListItem>
                        <input type="file" class="file-select" accept="image/*" onChange={this.handleFileUploadChange} />
                    
                   </ListItem>
                   <ListItem>
                       <Button onClick={this.onSubmit}>
                           Submit
                       </Button>
                       <Button onClick={()=>this.handleClose('Cancel')} value='Cancel'>
                           Cancel
                       </Button>
                   </ListItem>
                 </List>
                
            </DialogContentText>
        </DialogContent>
      </Dialog>
      </div>
      
    );
  }


}

MyDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

const AddDialogWrapped = withStyles(styles)(MyDialog);

const variantIcon = {
  success: CheckCircleIcon,

};

function MySnackbarContentWrapper(props) {
  
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      styles={{"backgroundColor": "green"}}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" style={{"display": 'flex',"alignItems": 'center',}}>
          <Icon style={{"fontSize": "20", "opacity": "0.9","marginRight":"20"}} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
          <CloseIcon style={{"fontSize": "20",}} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

class AddDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = event => {
    
    this.setState({open: false });
  };

  render() {
    return (
      <div>
       
        <IconBar onClick={this.handleClickOpen}>
            <Icon src = {add}></Icon> 
        </IconBar>
        <AddDialogWrapped
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}
const IconBar = styled.div`
    position: fixed;
    top: 80%;
    left:90%;
    -webkit-transform: translateY(-10%);
    -ms-transform: translateY(-10%);
    transform: translateY(-10%);
`

const Icon = styled.img`
    width:100px;
    height:100px;
    display: block;
    transition: all 0.3s ease;
    color: white;
    font-size: 20px;
    cursor: pointer;
`

export default AddDialog;