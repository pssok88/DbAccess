

import * as React from "react";
import { AthleteFanList } from "../blogs/AthleteFanList";
import { IUserFollowingRel, IUserFollowingRelSort } from "../../interfaces/blogs";
import { AthletesApi } from "../../api/Athletes";
import { Button, Input, DropDownList } from "../../common/components/form";

interface IUserFollowingRelState {
    userFollowingRel: IUserFollowingRel;
    currentTypes: IUserFollowingRel[];
    allFanCount: number;
    data: IUserFollowingRelSort;
}

export class UserFollowingPage extends React.Component<{}, IUserFollowingRelState>{

    constructor(props) {
        super(props);
        this.state = {
            userFollowingRel: {
                followingUserId: 0,
                followedByUserId: 0,
                id: 0,
                userBaseId: 0,
                firstName: "",
                lastName: "",
                isActive: false,
                email: "",
                createdDate: new Date(),
                appRoleId: 0,
                totalRecords: 0,
            },
            currentTypes: [],
            allFanCount: 0,
            data: {
                pageNumber: 1,
                columnName: "test",
                checked: false,
                input: "",
                recordsPerPage: 10
            },
        };
        this.onHeaderClick = this.onHeaderClick.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.arrowPage = this.arrowPage.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.getAllFans = this.getAllFans.bind(this);
        this.onDropChange = this.onDropChange.bind(this);
    }

    public componentDidMount() {
        document.title = "Team Prospect/User Following";
        this.getAllFans()
    }


    private getAllFans() {
        AthletesApi.getAllFanInfo(this.state.data)
            .then((response) => {
                //console.log(response)
                if (response.items.length > 0) {
                    this.setState({ currentTypes: response.items, allFanCount: response.items[0].totalRecords })
                } else {
                    this.setState({ currentTypes: response.items, allFanCount: 0 })
                }
            })
    }


    public nextPage(page) {
        let newCheck = false;

        if (this.state.data.columnName == "S" || this.state.data.columnName == "P") {
            newCheck = !this.state.data.checked
        }

        if (this.state.data.input !== "") {
            this.setState({
                data: {
                    ...this.state.data,
                    checked: false
                }
            })
        }
        this.setState({
            data: {
                ...this.state.data,
                pageNumber: page,
                checked: newCheck
            }
        }, () => { this.getAllFans() })
        
    }

    public arrowPage(direction) {
        var newPage = this.state.data.pageNumber + direction;
        //console.log(newPage)
        this.nextPage(newPage)
    }

    public onHeaderClick(column) {
        this.setState({
            data: {
                ...this.state.data,
                columnName: column
            }
        }, () => this.nextPage(this.state.data.pageNumber));
    }

    public onClick() {
        //  this.nextPage(1);//hardcoded 1 so it will always return the first page of the search
        this.setState({
            data: {
                ...this.state.data,
                pageNumber: 1
            }
        }, () => this.getAllFans())
    }

    public onDropChange(fieldname: string, fieldvalue: any) {
        this.setState({
            data: {
                ...this.state.data,
                recordsPerPage: fieldvalue,
                pageNumber: 1
            }
        }, () => this.nextPage(this.state.data.pageNumber))
    }

    private onFieldChange(fieldName: string, fieldValue: string) {
        switch (fieldName) {
            case "search":
                const nextState = {
                    ...this.state,
                    data: {
                        ...this.state.data,
                        input: fieldValue//binds the data.input to the fieldvalue
                    }
                }

                this.setState(nextState);

                if (fieldValue == "") {//added to fill list once input is deleted
                    this.setState({
                        data: {
                            pageNumber: 1,
                            columnName: "test",
                            checked: false,
                            input: "",
                            recordsPerPage: 10
                        }
                    }, () => this.getAllFans());//fires off the function right after the state has been set
                }
                break;
            //future inputs will be added in this switch statement
        }
    };

    public render() {
        var totalPages = [];

        //var totalCount = this.state.data.input !== "" ? this.state.currentTypes.length : this.state.allFanCount;
        //var pageCount = Math.ceil(totalCount / this.state.data.recordsPerPage);
        
        if (this.state.data.input !== "") {
            var pageCount = Math.ceil(this.state.currentTypes.length / this.state.data.recordsPerPage)//this is to change the totalpage count to the search return length
        } else {
            var pageCount = Math.ceil(this.state.allFanCount / this.state.data.recordsPerPage)//must be changed once the fix on multiple tier subscriptions made
        }
        for (var i = 1; i <= pageCount; i++) {//looping through the page count to determine the totalpages needed. Could have done in sql also
            totalPages.push(i);
        }

        const disabled: React.CSSProperties = {//used to disable the arrow if on first/last page
            pointerEvents: 'none'
        };
        const enabled: React.CSSProperties = {}
        const changeColor: React.CSSProperties = {
            background: '#333',
            color: '#ffcc33'
        }
        const maxPage = this.state.data.pageNumber >= totalPages.length; //used to find the first/last page and place an arrow

        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 row">
                            <div className="col-md-6 col-md-offset-1">
                                <br />
                                <div className="form-inline">
                                    <Input
                                        type="search"
                                        name="search"
                                        onEnter={this.onClick}
                                        value={this.state.data.input}
                                        onChange={this.onFieldChange}
                                        placeholder="Search Fans..."
                                    />
                                    <DropDownList
                                        style={{ marginLeft: 10 }}
                                        name="filter"
                                        selectedValue={this.state.data.recordsPerPage}
                                        onChange={this.onDropChange}
                                        options={[
                                            { key: 10, value: 10 },
                                            { key: 25, value: 25 },
                                            { key: 50, value: 50 }
                                        ]}
                                    />
                                    <Button
                                        label="Search"
                                        className="an-btn-small an-btn-prospect-transparent"
                                        style={{ marginLeft: "10px", marginTop: "10px", position: "relative", top: "5px" }}
                                        onClick={this.onClick}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="container">
                    <h1 style={{ marginLeft: 100 }}>Your Fans: {this.state.allFanCount}</h1>
                    <br />
                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <AthleteFanList
                                dataItems={this.state.currentTypes}
                                onButtonClick={null}
                                showEditButton={false}
                                showDeleteButton={false}
                                onHeaderClick={this.onHeaderClick}
                                headerColumns={[
                                    { columnName: "S", columnStyle: "basis-5" },
                                    { columnName: "P", columnStyle: "basis-5" },
                                    { columnName: "First Name", columnStyle: "basis-25" },
                                    { columnName: "Last Name", columnStyle: "basis-15" },
                                    { columnName: "Email", columnStyle: "basis-30" },
                                    { columnName: "Profile", columnStyle: "basis-10" }
                                ]} />
                        </div>
                    </div>
                    <div>
                        <h5><strong>S</strong>: Subscribed    ----    <strong>P</strong>: Prospect</h5>
                    </div>
                </div>

                {/**************************************************************STARTING PAGINATION*************************************************************/}

                <div className="an-page-container">
                    <div className="an-pagination-container center">
                        <ul className="pagination">
                            <li>
                                <a href="javascript:;" aria-label="Previous" style={this.state.data.pageNumber <= 1 ? disabled : enabled}

                                    onClick={(e) => {
                                        this.arrowPage(-1);
                                        return false;
                                    }} >
                                    <span aria-hidden="true"><i className="ion-chevron-left"></i></span>
                                </a>
                            </li>

                            {totalPages.map((page, index) => {

                                return (
                                    <li key={index}>
                                        <a href="javascript:;" style={page == this.state.data.pageNumber ? changeColor : enabled}
                                            onClick={(e) => {
                                                this.nextPage(page);
                                                //console.log("this is the: " + page);
                                                return false;
                                            }} >{page}</a>
                                    </li>
                                )
                            })}
                            <li>
                                <a href="javascript:;" aria-label="Next" style={maxPage ? disabled : enabled}
                                    onClick={(e) => {
                                        this.arrowPage(1);
                                        return false;
                                    }} >
                                    <span aria-hidden="true"><i className="ion-chevron-right"></i></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </React.Fragment >
        )
    }

}