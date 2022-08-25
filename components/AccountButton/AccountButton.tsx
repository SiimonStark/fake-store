
import Link from 'next/link';
import { User } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoginState, setLoggedIn } from 'store/slices/app';
import classes from './AccountButton.module.css';

function AccountButton() {
    const loggedIn = useSelector(selectLoginState);
    const dispatch = useDispatch();
    // Use Store to dynamically update signin section

    return (
        <Link href={loggedIn ? '/' : '/signin'}>
            <div className={classes.signIn}
                onClick={() =>
                    dispatch(setLoggedIn(loggedIn ? false : null))
                }>
                <User /> {loggedIn ? "Sign Out" : "Sign in"}
            </div>
        </Link>
    )
}

export default AccountButton;