'use client'

import { ErrorMessage, Field, 
        Form, 
        Formik } from 'formik';
import css from './NoteForm.module.css'
import type { NewNoteValues } from '@/types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postNote } from '@/lib/api';
import * as Yup from "yup";
import { useRouter } from 'next/navigation';
import { useNoteDraftStore } from '@/lib/store/noteStore';


export default function NoteForm() {
    const queryClient = useQueryClient();
    const router = useRouter();

    const handleCancel = () => router.push('/notes/filter/all');

    const {draft, setDraft, clearDraft} = useNoteDraftStore();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,) => {
        setDraft({
            ...draft,
            [event.target.name]: event.target.value,
        });
    };

    const NewNoteSchema = Yup.object().shape({
        title: Yup.string()
            .min(3, "Minimum 3 characters")
            .max(50, "Maximum 50 characters")
            .required("Title is required"),
        content: Yup.string()
            .max(500, "Maximum 500 characters"),
        tag: Yup.string()
            .oneOf(["Work", "Personal", "Meeting", "Shopping", "Todo"], "Choose valid tag")
            .required("Tag is required"),

    })

    const postMutation = useMutation({
        mutationFn: (newNote: NewNoteValues) => postNote(newNote),
        onSuccess: () => {
            console.log("Note added successfully!");
            clearDraft();
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            handleCancel();
        },
    });

    function handleSubmit(values: NewNoteValues) {
        postMutation.mutate(values);
    }

    return (
        <>
        <Formik initialValues={{
                title: draft?.title ?? "",
                content: draft?.content ?? "",
                tag: draft?.tag ?? "Todo",
            }} 
                onSubmit={handleSubmit}
                validationSchema={NewNoteSchema}>
            <Form className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor="title">Title</label>
                    <Field id="title" 
                    type="text" 
                    name="title" 
                    className={css.input} 
                    onChange={handleChange} />
                    <ErrorMessage name="title" component="span" className={css.error} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="content">Content</label>
                    <Field as="textarea"
                    id="content"
                    name="content"
                    rows={8}
                    className={css.textarea}
                    onChange={handleChange} />
                    <ErrorMessage name="content" component="span" className={css.error} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="tag">Tag</label>
                    <Field as="select" id="tag" name="tag" className={css.select} onChange={handleChange}>
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </Field>
                    <ErrorMessage name="tag" component="span" className={css.error} />
                </div>

                <div className={css.actions}>
                    <button type="button" className={css.cancelButton} onClick={handleCancel}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={css.submitButton}
                        disabled={false}
                    >
                        Create note
                    </button>
                </div>
            </Form>
        </Formik>
        </>
    );
}