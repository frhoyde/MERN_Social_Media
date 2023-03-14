import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';

import { Container, Grow, Grid } from '@material-ui/core';

import { getPosts } from '../../actions/posts';

// Components
import Posts from "../Posts/Posts";
import Form from "../Form/Form";

// Styles
import useStyles from './styles';

const Home = () => {
  const [currentID, setCurrentID] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
      <Grow in>
        <Container>
          <Grid className={classes.mainContainer} container justify-content="space-between" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentID={setCurrentID} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentID={currentID} setCurrentID={setCurrentID} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
  )
}

export default Home