import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadBugs, bugResolved, getUnresolvedBugs } from "../store/bugs";

export default function BugsList() {
  const dispatch = useDispatch();
  const bugs = useSelector(getUnresolvedBugs);

  useEffect(() => {
    dispatch(loadBugs());
  }, [dispatch]);

  return (
    <ul>
      {bugs.map((bug) => (
        <li key={bug.id}>
          {bug.description}{' '}
          <button onClick={() => dispatch(bugResolved(bug.id))}>
            Resolve
          </button>
        </li>
      ))}
    </ul>
  );
}