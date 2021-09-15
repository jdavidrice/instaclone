import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

LogRocket.init('l6icgt/instaclone');
setupLogRocketReact(LogRocket);

LogRocket.identify('jdavidrice@gmail.com', {
  name: 'Jeremy Rice',
  email: 'jdavidrice@gmail.com'
});
