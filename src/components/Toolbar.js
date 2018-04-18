import React from 'react'

const Toolbar = ({markReadCallback, selectAllCallback, messages}) => {
    // Given that no messages are selected
    // When a user checks the "Select All" checkbox
    // Then it should check all messages (and highlight them)
    //
    // Given that some messages are selected
    // When a user checks the "Select All" checkbox
    // Then it should check all messages (and highlight them)
    //
    // Given that all messages are selected
    // When a user unchecks the "Select All" checkbox
    // Then it should uncheck all messages (and unhighlight them)

    const countUnread = () => {
       let count = messages.filter(message => message.read === false || message.read === undefined).length;
       let message = count === 1? "unread message":"unread messages";
        return (<p class="pull-right">
                <span class="badge badge">{count}</span>
                {message}
            </p>
        )
    };

    return (
        <div class="row toolbar">
            <div class="col-md-12">
                {countUnread()}
                <button class="btn btn-default" onClick={() => selectAllCallback()}>
                    <i class="fa fa-check-square-o"></i>
                </button>

                <button class="btn btn-default" onClick={() => markReadCallback(true)}>
                    Mark As Read
                </button>

                <button class="btn btn-default" onClick={() => markReadCallback(false)}>
                    Mark As Unread
                </button>

                <select class="form-control label-select">
                    <option>Apply label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <select class="form-control label-select">
                    <option>Remove label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <button class="btn btn-default">
                    <i class="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
    )
};

export default Toolbar