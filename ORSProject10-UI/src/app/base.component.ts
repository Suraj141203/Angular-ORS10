import { OnInit } from '@angular/core';
import { ServiceLocatorService } from './service-locator.service';
import { ActivatedRoute } from '@angular/router';

export class BaseCtl implements OnInit {

  public api = {
    endpoint: null,
    get: null,
    save: null,
    search: null,
    delete: null,
    deleteMany: null,
    preload: null,
    report: null,
    address: null
  }

  initApi(ep) {
    this.api.endpoint = ep;
    this.api.get = ep + "/get";
    this.api.save = ep + "/save";
    this.api.search = ep + "/search";
    this.api.delete = ep + "/delete";
    this.api.deleteMany = ep + "/deleteMany";
    this.api.preload = ep + "/preload";
    this.api.report = ep + "/report";
    this.api.address = ep + "/address";
  }

  public form: any = {
    error: false,
    message: null,
    preload: [],
    data: { id: null },
    inputerror: {},
    searchParams: {},
    searchMessage: null,
    list: [],
    pageNo: 0
  };

  nextList = 0;

  constructor(
    public endpoint,
    public serviceLocator: ServiceLocatorService,
    public route: ActivatedRoute
  ) {
    const _self = this;
    _self.initApi(endpoint);

    serviceLocator.getPathVariable(route, function (params) {
      _self.form.data.id = params["id"];
    });
  }

  ngOnInit() {
    this.preload();
    if (this.form.data.id && this.form.data.id > 0) {
      this.display();
    }
  }

  preload() {
    const _self = this;
    this.serviceLocator.httpService.get(_self.api.preload, function (res, err) {
      if (err) {
        _self.form.message = err.message;
        _self.form.error = true;
        return;
      }
      if (res.success) {
        _self.form.preload = res.result;
      } else {
        _self.form.error = true;
        _self.form.message = res.result.message;
      }
    });
  }

  search() {
    const _self = this;
    this.serviceLocator.httpService.post(
      _self.api.search + "/" + _self.form.pageNo,
      _self.form.searchParams,
      function (res, err) {

        if (err) {
          _self.form.message = err.message;
          _self.form.error = true;
          return;
        }

        if (res.success) {
          _self.form.list = res.result.data;
          _self.nextList = res.result.nextList;

          if (_self.form.list.length === 0) {
            _self.form.message = "No record found";
            _self.form.error = true;
          }
        } else {
          // ✅ FIX APPLIED
          _self.form.error = true;
          _self.form.message = res.result.message || 'Service Unavailable';
        }
      }
    );
  }

  searchOperation(operation: String) {
    const _self = this;
    this.serviceLocator.httpService.post(
      _self.api.search + "/" + _self.form.pageNo,
      _self.form.searchParams,
      function (res) {

        if (operation === 'next' || operation === 'previous') {
          _self.nextList = res.result.nextList;
          _self.form.message = null;
          _self.form.error = false;
        }

        if (res.success) {
          _self.form.list = res.result.data;
          if (_self.form.list.length === 0) {
            _self.form.message = "No record found";
            _self.form.error = true;
          }
        } else {
          // ✅ FIX APPLIED
          _self.form.error = true;
          _self.form.message = res.result.message || 'Service Unavailable';
        }
      }
    );
  }

  display() {
    const _self = this;
    this.serviceLocator.httpService.get(
      _self.api.get + "/" + _self.form.data.id,
      function (res, err) {

        _self.form.data.id = 0;

        if (err) {
          _self.form.message = err.message;
          _self.form.error = true;
          return;
        }

        if (res.success) {
          _self.populateForm(_self.form.data, res.result.data);
        } else {
          _self.form.error = true;
          _self.form.message = res.result.message;
        }
      }
    );
  }

  populateForm(form, data) {
    form.id = data.id;
  }

  submit() {
    const _self = this;
    this.serviceLocator.httpService.post(
      this.api.save,
      this.form.data,
      function (res, err) {

        _self.form.message = '';
        _self.form.inputerror = {};
        _self.form.error = false;

        if (err) {
          _self.form.message = err.message;
          _self.form.error = true;
          return;
        }

        if (res.success) {
          _self.form.error = false;
          _self.form.message =
            _self.form.data.id && _self.form.data.id > 0
              ? "Data updated successfully"
              : "Data saved successfully";

          if (res.result && res.result.data) {
            _self.form.data.id = res.result.data;
          }
        } else {
          _self.form.error = true;
          if (res.result && res.result.inputerror) {
            _self.form.inputerror = res.result.inputerror;
          }
          _self.form.message = res.result.message;
        }
      }
    );
  }
}
