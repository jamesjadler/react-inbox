import React from 'react'

const Toolbar = ({markReadCallback, selectAllCallback, messages}) => {

    const countUnread = () => {
        let count = messages.filter(message => message.read === false || message.read === undefined).length;
        let message = count === 1 ? "unread message" : "unread messages";
        return (<p class="pull-right">
                <span class="badge badge">{count}</span>
                {message}
            </p>
        )
    };

    const selectButtonStyle = () => {
        let selectedCount = messages.filter(message => message.selected === true).length;
        let msgCount = messages.length;
        let style = "fa fa-square-o";
        let diff = msgCount - selectedCount;
        if (diff === 0) {
            style = "fa fa-check-square-o"
        } else if (diff > 0 && diff < msgCount) {
            style = "fa fa-minus-square-o"
        }
        return style
    };

    return (
        <div class="row toolbar">
            <div class="col-md-12">
                {countUnread()}
                <button class="btn btn-default" onClick={() => selectAllCallback()}>
                    <i class={selectButtonStyle()}></i>
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