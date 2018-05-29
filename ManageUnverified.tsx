import * as React from "react";
import { AthletesApi } from "../../api/Athletes";
import { IAthleteUnverified } from "../../interfaces/manageusers/IAthleteUnverified";
import { AthleteUnverifiedList } from "./ManageUnverifiedList";
import { IAthleteUnverifiedGetEntity } from "../../interfaces/athletes/IAthleteUnverifiedGetEntity";
import { Button, RadioButtonList, Input } from "../../common/components/form";

interface IManageUnverifiedState {
    athleteInfo: IAthleteUnverified[];
    athleteUnverified: IAthleteUnverified;
    sortPageEntity: IAthleteUnverifiedGetEntity;
    totalAthleteCount: number;
}

export class ManageUnverified extends React.Component<{}, IManageUnverifiedState> {
    constructor(props) {
        super(props);
        this.state = {
            athleteUnverified: {
                userBaseId: 0,
                firstName: "",
                lastName: "",
                isValidated: false,
                isProfessional: false,
                totalPages: 1 //returns total pages
            },
            athleteInfo: [],
            sortPageEntity: {
                pageNumber: 1,
                recordsPerPage: 20,
                input: ""
            },
            totalAthleteCount : 0
        }
        this.getList = this.getList.bind(this);
        this.verifyAthlete = this.verifyAthlete.bind(this);
        this.verifyPro = this.verifyPro.bind(this);
        this.updateValidation = this.updateValidation.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.getArrowDirection = this.getArrowDirection.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }
    public componentDidMount() {
        this.getList();
    }
    //Pagination Stuff - Added by Kevin
    //------------------------------------
    public nextPage(page: number) { //function for page number for pagination
            this.setState({
                sortPageEntity: {
                    ...this.state.sortPageEntity,
                    pageNumber: page
                }
            }, () => { this.getList() });
    }

    private getArrowDirection(direction: number) { // function for direction of the pagination
        let newPage = this.state.sortPageEntity.pageNumber + direction;
            this.setState({
                sortPageEntity: {
                    ...this.state.sortPageEntity,
                    pageNumber: newPage
                }
            }, () => { this.getList() });
    }
    
    public onSearch(fieldName: string, fieldValue: any) {
        switch (fieldName) {
            case "search":
                const nextState = {
                    ...this.state,
                    sortPageEntity: {
                        ...this.state.sortPageEntity,
                        input: fieldValue,
                        pageNumber: 1
                    }
                }
                this.setState(nextState);
                if (fieldValue == "") {
                    this.setState({
                        sortPageEntity: {
                            pageNumber: 1,
                            recordsPerPage: 20,
                            input: ""
                        }
                    }, () => { this.getList() });
                }
                break;
        }
    }
    //------------------------------------
    public getList() {
        AthletesApi.GetUnverified(this.state.sortPageEntity)
            .then((response) => {
                if (response.items.length > 0) {
                    this.setState({
                        athleteInfo: response.items,
                        athleteUnverified: {
                            ...this.state.athleteUnverified,
                            totalPages: response.items[0].totalPages
                        },
                        totalAthleteCount: response.items[0].totalAthlete
                    })
                } else {
                    this.setState({
                        athleteInfo: response.items,
                        athleteUnverified: {
                            ...this.state.athleteUnverified,
                            totalPages: 0
                        },
                        totalAthleteCount: 0
                    })
                }
            });
    }

    public updateValidation(data) {
        AthletesApi.PutVerification(data)
            .then((Response) => {
                this.getList();
            })
    }

    public verifyAthlete(id: number, verify: boolean, pro: boolean) {
        let data = {
            userBaseId: id,
            isValidated: !verify,
            isProfessional: pro
        }
        this.updateValidation(data);
    }

    public verifyPro(id: number, verify: boolean, pro: boolean) {
        let data = {
            userBaseId: id,
            isValidated: verify,
            isProfessional: !pro
        }
        this.updateValidation(data);
    }

    public render() {
        var pagesArray = [];
        if (this.state.sortPageEntity.input !== "" /*|| this.state.totalAthleteCount < 20*/) { // if we are searching this will count how many is in the array and divide it by 20. 20 because that's how much we want to show per page
            //pageCount = 0;
            var pageCount = Math.ceil(this.state.athleteInfo.length / this.state.sortPageEntity.recordsPerPage);

        } //
        else {
            var pageCount = this.state.athleteUnverified.totalPages
        }

        for (var i = 1; i <= pageCount; i++) {
            pagesArray.push(i); // if we are not searching it will return the total number of users
        }

        const disabled: React.CSSProperties = {
            pointerEvents: 'none'
        };
        const enabled: React.CSSProperties = {}
        const changeColor: React.CSSProperties = {
            background: '#333',
            color: '#ffcc33'
        }
        const maxPage = this.state.sortPageEntity.pageNumber >= this.state.athleteUnverified.totalPages;//this.state.athleteUnverified.total;
        return (
            <div className="an-page-container">
                <div className="container">
                    <h3>Total Unverified Athletes: {this.state.totalAthleteCount}</h3>
                    <div className="form-inline">
                        <Input type="search" name="search" onEnter={this.getList} value={this.state.sortPageEntity.input} onChange={this.onSearch} placeholder="Search Users"> </Input>
                        <button className="an-btn-small an-btn-prospect" style={{ left: 10, top: 5 }} type="button" onClick={this.getList}>Search</button>
                    </div>
                    <AthleteUnverifiedList
                        dataItems={this.state.athleteInfo}
                        verified={this.verifyAthlete}
                        professional={this.verifyPro}
                        headerColumns={[
                            { columnName: "Athlete", columnStyle: "basis-20" },
                            { columnName: "Pro", columnStyle: "basis-20" },
                            { columnName: "First Name", columnStyle: "basis-30" },
                            { columnName: "Last Name", columnStyle: "basis-30" },
                            { columnName: "Profile", columnStyle: "basis-20" }
                        ]}
                    />
                    <div className="an-pagination-container with-border-color center">
                        <ul className="pagination">
                            <li>
                                <a href="javascript:;" aria-label="Previous" style={this.state.sortPageEntity.pageNumber <= 1 ? disabled : enabled}
                                    onClick={(e) => {
                                        this.getArrowDirection(-1);
                                        return false;
                                    }}>
                                    <span aria-hidden="true"><i className="ion-chevron-left"></i></span>
                                </a>
                            </li>
                            {pagesArray.map((newPage, index) => {
                                return (
                                    <li key={index}>
                                        <a href="javascript:;" style={newPage == this.state.sortPageEntity.pageNumber ? changeColor : enabled}
                                            onClick={(e) => {
                                                this.nextPage(newPage);
                                                return false;
                                            }}>{newPage}</a>
                                    </li>
                                )
                            })}
                            <li>
                                <a href="javascript:;" aria-label="Next" style={ maxPage ? disabled : enabled }
                                    onClick={(e) => {
                                        this.getArrowDirection(1);
                                        return false;
                                    }}>
                                    <span aria-hidden="true"><i className="ion-chevron-right"></i></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}