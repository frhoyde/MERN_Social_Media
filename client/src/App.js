import React, {useState, useEffect} from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts } from './actions/posts';
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import Navbar from './components/Navbar/Navbar';
import useStyles from './styles';

const App = () => {
  const [currentID, setCurrentID] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <Container maxwidth="lg">
      <Navbar />
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
    </Container>
  )
}
export default App;
