# Docker Compose

run : docker-compos up -d

## Test Promotheuse

To test that promotheus is able to collect metrics go to: http://localhost:9090/

## Test Grafana

1- Go to : http://localhost:3000/
2- in the left menu go to: Setting --> Data source --> add Promotheus DS (using http://prometheus:9090 as HTTP URL)
3- in your application, go to "grafana-template.json" in the monotoring folder and change the line   "title": "Zynerator" with "title": "yourApplicationName"
4- in your application, go to "grafana-template.json" in the monotoring folder and change the line    "uid": "X034JGT7Gz", with  "uid": "yourUUID",
5- in the left menu go to: + --> Import --> in "Import via panel json" copy the content of  grafana-template.json and select promotheusDataSource
6- in the left menu go to: windowns icone (just below + icon) --> dashbord --> and your visualise data 