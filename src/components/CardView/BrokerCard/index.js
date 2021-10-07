import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { red, green } from '@material-ui/core/colors';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '10px auto'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  green: {
    color: green[500]
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  avatar2: {
    backgroundColor: green[500],
  },
  status: {
    backgroundColor: '#009be5',
  },
  rate: {
    backgroundColor: '#666',
  },
  cardActions: {
    backgroundColor: '#eee'
  }
}));

export default function BrokerCard(props) {
  const { data, selected, setSelected, actions } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <Grid container spacing={0} alignItems="center" justify="space-between">
        <Grid item xs={12}>
            <CardHeader
            avatar={
              <Avatar aria-label="status" className={classes.status}>

              </Avatar>
            }
            action={
              <Checkbox
                checked={selected.includes(data.id)}
                onClick={(event) => setSelected(event, data.id)}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            title="Broker"
            subheader={data.name}
          />
        </Grid>
        <Grid item xs={12}>
          <CardHeader
          avatar={
            <Avatar aria-label="drop" className={classes.avatar}>

            </Avatar>
          }
          title={`Contact: ${data.billingContact}`}
          subheader={`Phone: ${data.phone}`}
        />
        </Grid>
        <Grid item xs={12}>
          <CardHeader
          avatar={
            <Avatar aria-label="pickup" className={classes.avatar2}>
              <MailOutlineIcon/>
            </Avatar>
          }
          title={data.billingEmail}
          subheader={data.Email}
        />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CardActions disableSpacing className={classes.cardActions}>
            <Button color="primary" size="small" variant="contained" onClick={() => actions.handleClick(data.id)}>Details</Button>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Address:</b>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {data.address}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>QuickPay:</b> {data.quickPay}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>QuickPay Percent:</b> {data.quickPayPercentage*100}%
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Payment Terms:</b> {data.paymentTerms} Days
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>TONU Fee:</b> {data.tonuFee}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Detention Rate:</b> ${data.detentionRate}/hr
              </Typography>
            </CardContent>
          </Collapse>
        </Grid>
      </Grid>
    </Card>
  );
}
