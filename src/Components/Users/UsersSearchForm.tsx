import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterFormType} from "../../redux/Reducers/users-reducer";

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

type UsersSearchFormPropsType = {
    onFilterChanged: (filter: FilterFormType) => void
}

export const UsersSearchForm: React.FC<UsersSearchFormPropsType> = React.memo((props) => {

    const submit = (values: FilterFormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        debugger
        props.onFilterChanged(values)
        setSubmitting(false)
    }

    return <div>
        <Formik
            initialValues={{term: '', friend: null}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Friends</option>
                        <option value="false">Unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
})