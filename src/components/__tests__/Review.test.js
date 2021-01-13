import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Review from '../Review';

const ACTIVE_CLASS = 'is-Active';
const COMMENT_FIELD_CLASS = 'hlx-Review-commentFields';
test('sets is-Active class on current ratinga and below the clicked rating', () => {
    render(<Review />);
    userEvent.click(screen.getByLabelText('3'));
    expect(screen.getByLabelText('5')).not.toHaveClass(ACTIVE_CLASS);
    expect(screen.getByLabelText('4')).not.toHaveClass(ACTIVE_CLASS);
    expect(screen.getByLabelText('3')).toHaveClass(ACTIVE_CLASS);
    expect(screen.getByLabelText('2')).toHaveClass(ACTIVE_CLASS);
    expect(screen.getByLabelText('1')).toHaveClass(ACTIVE_CLASS);
});

test('Shows comment field when rated below comment threshold', () => {
    render(<Review commentThreshold={2} />);

    userEvent.click(screen.getByLabelText('3'));
    expect(document.getElementsByClassName(COMMENT_FIELD_CLASS)).toHaveLength(0);

    userEvent.click(screen.getByLabelText('1'));
    expect(document.getElementsByClassName(COMMENT_FIELD_CLASS)).toHaveLength(1);

    userEvent.click(screen.getByLabelText('5'));
    expect(document.getElementsByClassName(COMMENT_FIELD_CLASS)).toHaveLength(0);

    userEvent.click(screen.getByLabelText('2'));
    expect(document.getElementsByClassName(COMMENT_FIELD_CLASS)).toHaveLength(1);
});
