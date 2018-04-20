import React from 'react'

const Toolbar = ({markReadCallback, selectAllCallback, deleteSelectedCallback, labelSelectedCallback, messages}) => {

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

    const onLabelChange = (e, operation) => {
        e.preventDefault();
        let value = e.target.value;
        console.log("label:" + value);
        labelSelectedCallback(value, operation)
    };
    const disableButton = () => {
        return messages.filter(message => message.selected === true).length === 0;
    };


    return (
        <div class="row toolbar">
            <div class="col-md-12">
                {countUnread()}
                <button class="btn btn-default" onClick={() => selectAllCallback()}>
                    <i class={selectButtonStyle()}></i>
                </button>

                <button class="btn btn-default" disabled = {disableButton()} onClick={() => markReadCallback(true)}>
                    Mark As Read
                </button>

                <button class="btn btn-default" disabled = {disableButton()} onClick={() => markReadCallback(false)}>
                    Mark As Unread
                </button>

                <select name="labelAdd" class="form-control label-select" disabled = {disableButton()} onChange={(e) => onLabelChange(e, "addLabel")}>
                    <option>Apply label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <select name="labelRemove" class="form-control label-select" disabled = {disableButton()}
                        onChange={(e) => onLabelChange(e, "removeLabel")}>
                    <option>Remove label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <button class="btn btn-default" disabled = {disableButton()} onClick={() => deleteSelectedCallback()}>
                    <i class="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
    )
};

export default Toolbar