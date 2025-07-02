
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const BuyerAssistant = () => {
  const tmtChartData = [
    { diameter: '8 mm', weightPerMeter: '0.395', weightPerFeet: '0.1204', weightPer12m: '4.74' },
    { diameter: '10 mm', weightPerMeter: '0.617', weightPerFeet: '0.1881', weightPer12m: '7.40' },
    { diameter: '12 mm', weightPerMeter: '0.888', weightPerFeet: '0.2706', weightPer12m: '10.66' },
    { diameter: '16 mm', weightPerMeter: '1.580', weightPerFeet: '0.4814', weightPer12m: '18.96' },
    { diameter: '20 mm', weightPerMeter: '2.470', weightPerFeet: '0.7529', weightPer12m: '29.64' },
    { diameter: '25 mm', weightPerMeter: '3.850', weightPerFeet: '1.1722', weightPer12m: '46.20' }
  ];

  const selectionCriteriaData = [
    { criteria: 'Grade', whatToLookFor: 'Fe 415, Fe 500, Fe 550D, Fe 600 (Higher grade = Higher strength)' },
    { criteria: 'Corrosion Resistance', whatToLookFor: 'Go for CRS (Corrosion Resistant Steel) for coastal/monsoon areas' },
    { criteria: 'Earthquake Resistance', whatToLookFor: 'Fe 500D or Fe 550D bars (more ductile, better shock resistance)' },
    { criteria: 'Brand Certification', whatToLookFor: 'ISI Certified brands only (e.g., Tata Tiscon, JSW Neosteel)' },
    { criteria: 'Bendability', whatToLookFor: 'Check for ductility and elongation – key for seismic zones' },
    { criteria: 'Surface Finish', whatToLookFor: 'Should be ribbed for better concrete bonding' },
    { criteria: 'Weldability', whatToLookFor: 'Especially important in industrial & commercial construction' },
    { criteria: 'Testing Parameters', whatToLookFor: 'Ensure the bars are lab-tested for elongation, tensile strength' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <Header />
      
      {/* Main iframe content */}
      <div className="h-[calc(100vh-60px)] overflow-hidden relative">
        <div className="w-full h-full overflow-hidden relative">
          <iframe
            src="https://buyer-guide-rebuild.lovable.app/buyer-tools"
            className="w-full h-full border-0"
            title="Buyer Assistant Tools"
            scrolling="no"
            style={{
              marginTop: '-80px',
              height: 'calc(100% + 80px)',
              transform: 'scale(0.75)',
              transformOrigin: 'top left',
              width: '133.33%'
            }}
          />
        </div>
      </div>
      
      {/* TMT Bar Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        {/* More Sellers Near You Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">
              More Sellers Near You For{' '}
              <span className="text-blue-600 underline cursor-pointer">TMT Bars</span>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* TMT Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">TMT Bar Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-600 font-medium">Diameter (mm)</TableHead>
                    <TableHead className="text-gray-600 font-medium">Weight per Meter (kg)</TableHead>
                    <TableHead className="text-gray-600 font-medium">Weight per Feet (kg)</TableHead>
                    <TableHead className="text-gray-600 font-medium">Weight per 12m Bar (kg)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tmtChartData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{row.diameter}</TableCell>
                      <TableCell>{row.weightPerMeter}</TableCell>
                      <TableCell>{row.weightPerFeet}</TableCell>
                      <TableCell>{row.weightPer12m}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* TMT Buying Guide */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">TMT Buying Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">TMT grades and their suitability</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800">Fe415:</h4>
                  <p className="text-gray-600 leading-relaxed">
                    This is one of the most commonly used TMT grades. The 'Fe' stands for iron, and '415' represents the minimum yield strength of the steel in megapascals (MPa), which is approximately 415 MPa. Fe415 TMT is suitable for a wide range of construction applications.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800">Fe500:</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Fe500 TMT has a minimum yield strength of around 500 MPa. It offers higher strength and is often used in structures where greater load-bearing capacity is required. This grade is suitable for multi storied buildings.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800">Fe550:</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Fe550 TMT has a minimum yield strength of approximately 550 MPa. It is used in applications that demand even higher strength and load-bearing capacity. This grade is suitable for high rise buildings, bridges, and industrial projects.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800">Fe600:</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Fe600 TMT has a minimum yield strength of around 600 MPa, making it one of the strongest TMT grades available. It is used in specialised and heavy-duty construction projects.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800">Fe415D, Fe500D, Fe550D, and Fe600D:</h4>
                  <p className="text-gray-600 leading-relaxed">
                    The 'D' in these grades stands for 'ductile,' indicating that these TMT bars have enhanced ductility in addition to their specified yield strength. Ductile TMT bars are used in earthquake-prone regions to enhance the structural integrity of buildings during seismic events.
                  </p>
                </div>

                <div className="mt-6">
                  <p className="text-gray-600 leading-relaxed">
                    Selecting the right TMT for your construction project is a complex decision that requires careful consideration of multiple factors. From project requirements and TMT grades to corrosion resistance, strength, and sustainability, each element plays a crucial role in ensuring the success and longevity of your endeavour. Consult with experts, evaluate suppliers, and stay informed about emerging trends to make an informed decision that aligns with your project's goals and values.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selection Criteria */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">Selection Criteria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-600 font-medium w-1/3">Criteria</TableHead>
                    <TableHead className="text-gray-600 font-medium">What to Look For</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectionCriteriaData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium text-gray-800">{row.criteria}</TableCell>
                      <TableCell className="text-gray-600">{row.whatToLookFor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          html, body {
            overflow-x: hidden;
          }
          iframe {
            clip-path: inset(80px 0 0 0);
            max-width: none !important;
          }
        `
      }} />
    </div>
  );
};

export default BuyerAssistant;
