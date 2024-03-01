import { Bind, Controller, Param } from '@nestjs/common'
import { Get } from '@nestjs/common'
import { RangeService } from './range.service'

@Controller('range')
export class RangeController {
  constructor(private rangeService: RangeService) {}

  @Get()
  getRange() {
    return this.rangeService.getRange()
  }

  @Get(':id')  
  @Bind(Param('id'))
  getRangeParam(id: number) {
    return this.rangeService.getRangeParam(id)
  }
}
