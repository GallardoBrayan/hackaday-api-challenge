$(document).ready(function() {
  $.ajax({
    url: "/projects?page=1",
    type: "GET",

    success: function(data) {
      createTable(data);
    }
  });
});

function createTable(data) {
  <table
    id="dtBasicExample"
    class="table table-striped table-bordered table-sm"
    cellspacing="0"
    width="100%"
  >
    <thead>
      <tr>
        <th class="th-sm">Name</th>
        <th class="th-sm">Position</th>
        <th class="th-sm">Office</th>
        <th class="th-sm">Age</th>
        <th class="th-sm">Start date</th>
        <th class="th-sm">Salary</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Jackson Bradshaw</td>
        <td>Director</td>
        <td>New York</td>
        <td>65</td>
        <td>2008/09/26</td>
        <td>$645,750</td>
      </tr>
      <tr>
        <td>Olivia Liang</td>
        <td>Support Engineer</td>
        <td>Singapore</td>
        <td>64</td>
        <td>2011/02/03</td>
        <td>$234,500</td>
      </tr>

      <tr>
        <td>Serge Baldwin</td>
        <td>Data Coordinator</td>
        <td>Singapore</td>
        <td>64</td>
        <td>2012/04/09</td>
        <td>$138,575</td>
      </tr>
      <tr>
        <td>Zenaida Frank</td>
        <td>Software Engineer</td>
        <td>New York</td>
        <td>63</td>
        <td>2010/01/04</td>
        <td>$125,250</td>
      </tr>
      <tr>
        <td>Zorita Serrano</td>
        <td>Software Engineer</td>
        <td>San Francisco</td>
        <td>56</td>
        <td>2012/06/01</td>
        <td>$115,000</td>
      </tr>
      <tr>
        <td>Jennifer Acosta</td>
        <td>Junior Javascript Developer</td>
        <td>Edinburgh</td>
        <td>43</td>
        <td>2013/02/01</td>
        <td>$75,650</td>
      </tr>

      <tr>
        <td>Michael Bruce</td>
        <td>Javascript Developer</td>
        <td>Singapore</td>
        <td>29</td>
        <td>2011/06/27</td>
        <td>$183,000</td>
      </tr>
      <tr>
        <td>Donna Snider</td>
        <td>Customer Support</td>
        <td>New York</td>
        <td>27</td>
        <td>2011/01/25</td>
        <td>$112,000</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th>Name</th>
        <th>Position</th>
        <th>Office</th>
        <th>Age</th>
        <th>Start date</th>
        <th>Salary</th>
      </tr>
    </tfoot>
  </table>;
}
